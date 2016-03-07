//  To avoid polluting the global namespace, wrap all of your functions in an IIFE. 
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {
    
    // All Services are singletons, using .service() or .factory() differs the way Objects are created.

    // This file gives an example of using a .factory().
    // Factories are for business logic or provider modules, return an Object or a closure.

    function devNoticeService($window, AppConfig, $log) {
        var displayList = ['localhost', '127.0.0.1'];

        var containsSomeWhere = function(arObject, value) {
            if (arObject) {
                var found = _.find(arObject, function(entry){
                    return value.indexOf(entry) !== -1;
                });

                return angular.isDefined(found);
            }

            return false;
        };

        var daysBetween = function(date1, date2) {
            //Get 1 day in milliseconds
            var one_day = 1000 * 60 * 60 * 24;

            // Convert both dates to milliseconds
            var date1_ms = +date1;
            var date2_ms = +date2;

            // Calculate the difference in milliseconds
            var difference_ms = date2_ms - date1_ms;

            // Convert back to days and return
            return Math.round(difference_ms/one_day); 
        };

        var getAppConfigDate = function(dateKey) {
            try {
                if (AppConfig.hasOwnProperty(dateKey)) {
                    var dateString = AppConfig[dateKey];
                    if (dateString) {
                        dateString = dateString.replace(/"/g, '');
                        return new Date(dateString);
                    }
                }
            }
            catch(err) {
                // do nothing
                console.error(err);
            }

            return new Date(0);
        };

        var checkBuildDate = function() {
            var now = new Date();
            var build = getAppConfigDate('created_date');

            var diff = daysBetween(build, now);
            if (diff > 0) {
                $log.log('%c Stop!', 'color:red; font-size: 100px; text-shadow: 2px 2px gray;');
                $log.log("%c It seems you have not performed 'grunt build' for some time.", 'font-size: 30px;'); 
                $log.log("%c Please do a 'npm install' followed by 'grunt build'.", 'font-size: 30px;'); 
                $log.log("%c (It is a Developer Notice, please ignore if you are not a developer of this application)", 'font-size: 14px;');
                return true;
            }
        };

        var checkGitPullDate = function() {
            var now = new Date();
            var build = getAppConfigDate('git_lastPullDate');

            var diff = daysBetween(build, now);
            if (diff > 0) {
                $log.log('%c Stop!', 'color:red; font-size: 100px; text-shadow: 2px 2px gray;');
                $log.log("%c It seems you have not merged the source from git for some time.", 'font-size: 30px;'); 
                $log.log("%c Please get the latest source from git.", 'font-size: 30px;'); 
                $log.log("%c (It is a Developer Notice, please ignore if you are not a developer of this application)", 'font-size: 14px;');
                return true;
            }
        };

        var canPutNotice = function() {
            var canDisplay = false;
            if (AppConfig.environment === 'dev') {
                canDisplay = containsSomeWhere(displayList, $window.location.href);
            }
            return canDisplay;
        };

        var putDeveloperNotice = function() {
            if (canPutNotice()) {
                if (checkBuildDate()) {
                    return;
                }
                if (checkGitPullDate()){
                    return;
                }
            }
        };

        return {
            putDeveloperNotice: putDeveloperNotice,
        };
    }

    // Pass functions into module methods rather than assigning a callback.
    // This helps aid with readability and helps reduced the amount of code "wrapped"
    // inside Angular.
    angular.module('common')
    .factory('devNoticeService', devNoticeService);
    
})();