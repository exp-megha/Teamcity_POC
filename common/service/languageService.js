//  To avoid polluting the global namespace, wrap all of your functions in an IIFE. 
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {
    
    // All Services are singletons, using .service() or .factory() differs the way Objects are created.

    // This file gives an example of using a .factory().
    // Factories are for business logic or provider modules, return an Object or a closure.

    function languageService(gettextCatalog, localStorageService, AppConfig) {
        var getSupportedLanguages = function() {
            return [
                { id:'en', displayText:'English'},
                { id:'dt', displayText: 'Dutch'},
            ];
        };

        var getCurrentLanguage = function() {
            //return gettextCatalog.currentLanguage;
            var crntLanguage = localStorageService.get('xport.user.data');
            if(crntLanguage) {
                return crntLanguage.language;
            }
            else{
                return gettextCatalog.currentLanguage;
            } 
        };

        var setCurrentLanguage = function(lang) {
            gettextCatalog.setCurrentLanguage(lang);
        };

        return {
            getSupportedLanguages: getSupportedLanguages,
            getCurrentLanguage: getCurrentLanguage,
            setCurrentLanguage: setCurrentLanguage
        };
    }

    // Pass functions into module methods rather than assigning a callback.
    // This helps aid with readability and helps reduced the amount of code "wrapped"
    // inside Angular.
    angular.module('common')
    .factory('languageService', languageService);
    
})();