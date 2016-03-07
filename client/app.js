(function() {
    var modules = [
        'ui.bootstrap',                 // bootstrap ui controls
        'ui.utils',                     // ui utils from angular ui
        'ui.router',                    // router component
        'ngAnimate',                    // Animation support
        'gettext',                      // translation support
        'restangular',                  // Service support
        'LocalStorageModule',           // Local Storage Support
        'ngFoobar',                     // The sliding alert notification
        'blockUI',                      // The Loading message
        'ngSanitize',                   // HTML Santize support

        /*palaverPlace MODULES*/
        'common'                        // common module for iss

    ];

    angular.module('palaverPlace', modules);

    function config($stateProvider, $urlRouterProvider, RestangularProvider, AppConfig) {

           /* Add New States Above */
        //RestangularProvider.setBaseUrl('http://localhost/');
        //RestangularProvider.setBaseUrl('http://localhost/xport_git/xport/server/public/index.php/');

        RestangularProvider.setBaseUrl(AppConfig.api_server);

    }

    function run($rootScope, $state, $log) {
        

    }

    angular.module('palaverPlace').config(config);
    angular.module('palaverPlace').run(run);

})();
