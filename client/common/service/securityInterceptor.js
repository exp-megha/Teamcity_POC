//  To avoid polluting the global namespace, wrap all of your functions in an IIFE.
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {
    function securityInterceptor() {
        this.$get = ['$injector', '$q', '$window', function($injector, $q, $window) {
        return function(promise) {
            return promise.then(null, function(response) {
                    
                console.log("response.status" ,response);
                if( response.status === 401) {
                    var location = $injector.get('$location');
                    location.url('/404');
                    throw 'AuthorizationError';
                }else if(response.status === 403){
                    var location403 = $injector.get('$location');
                    location403.url('/403');
                    throw 'AuthorizationError';                    

                }else if(response.status === 0 ){

                    var onlineStatus = {};
                    onlineStatus.onLine = $window.navigator.onLine;
                    $window.addEventListener("offline", function () {
                        onlineStatus.onLine = false;
                       
                    }, true);
                    $window.addEventListener("online", function () {
                        onlineStatus.onLine = true;
                      
                    }, true);
                    if(onlineStatus.onLine === false){
                       var golocation = $injector.get('$location');
                       golocation.url('/offline');
                       throw 'AuthorizationError';
                    }                    

                }
                return $q.reject(response);
            });
          };
        }];
    }

    // Pass functions into module methods rather than assigning a callback.
    // This helps aid with readability and helps reduced the amount of code "wrapped"
    // inside Angular.
    angular.module('common')
    .provider('securityInterceptor', securityInterceptor);

})();
