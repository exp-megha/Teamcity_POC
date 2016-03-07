//  To avoid polluting the global namespace, wrap all of your functions in an IIFE.
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {

    // All Services are singletons, using .service() or .factory() differs the way Objects are created.

    // This file gives an example of using a .factory().
    // Factories are for business logic or provider modules, return an Object or a closure.

    function modalService($uibModal, $log, gettext) {
        var serviceObject = {};

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'common/templates/modal_confirm.html'
        };

        var modalOptions = {
            closeButtonText: gettext('Close'),
            actionButtonText: gettext('OK'),
            headerText: gettext('Proceed?'),
            bodyText: gettext('Do you want to proceed?'),
            subtitle: gettext('')
        };

        var showModalError = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) {
                customModalDefaults = {};
            }
            customModalDefaults.backdrop = 'static';
            customModalDefaults.templateUrl = 'common/templates/modal_error.html';
            return show(customModalDefaults, customModalOptions);
        };

        var showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) {
                customModalDefaults = {};
            }
            customModalDefaults.backdrop = 'static';
            return show(customModalDefaults, customModalOptions);
        };

        var show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        angular.extend(customModalOptions, tempModalOptions);
                        $modalInstance.close('ok');
                    };
                    $scope.modalOptions.close = function (result) {
                        angular.extend(customModalOptions, tempModalOptions);
                        $modalInstance.close('cancel');
                    };
                    $scope.modalOptions.refresh = function (result) {
                        angular.extend(customModalOptions, tempModalOptions);
                        $modalInstance.close('refresh');
                    };
                    $scope.modalOptions.onFileSelect = function (result) {
                        $scope.modalOptions.imageToUpload = result;
                        angular.extend(customModalOptions, tempModalOptions);
                    };
                    $scope.modalOptions.setMaxDate = function (result) {
                        $scope.modalOptions.maxDate = result;
                        angular.extend(customModalOptions, tempModalOptions);
                    };
                    $scope.modalOptions.skip = function (result) {
                        angular.extend(customModalOptions, tempModalOptions);
                        $modalInstance.close('skip');
                    };
                }];
            }

            return $uibModal.open(tempModalDefaults).result;
        };

        // Always return a host Object instead of the revealing module pattern.
        // This is due to the way Object references are bound and updated.
        // Primitive values cannot update alone using the revealing module pattern.
        return {
            show: show,
            showModal: showModal,
            showModalError: showModalError
        };
    }

    // Pass functions into module methods rather than assigning a callback.
    // This helps aid with readability and helps reduced the amount of code "wrapped"
    // inside Angular.
    angular.module('common')
    .factory('modalService', modalService);

})();
