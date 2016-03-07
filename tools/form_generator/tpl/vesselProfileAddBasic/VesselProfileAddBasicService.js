(function() {

    function xpVesselProfileAddBasicService(Restangular) {

        var serviceObject = {};

        var restAngular = Restangular.withConfig(function(Configurer) {

            Configurer.setBaseUrl('base Url from config file');
        });
        
        //on submit
        serviceObject.save=function(data) {

            var saveObject = Restangular.one("" , customerId).one(" vessel" , vesselId).one("{vesselId}" , basic).one("" ); 
            angular.extend(saveObject,data);
            saveObject.post().then(function(newMsg) {

                return newMsg;

            }, function error(reason) {
                // An error has occurred 
                return reason;
            });
        }

        // Inital Load
        
         // service for events 
                 
            
                serviceObject.onReset = function (param) {
                   
                };

            
                //END service for events

        return serviceObject;
    }

    angular.module('vessel')
        .factory('xpVesselProfileAddBasicService', xpVesselProfileAddBasicService);
})();