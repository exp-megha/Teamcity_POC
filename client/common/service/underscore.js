//  To avoid polluting the global namespace, wrap all of your functions in an IIFE. 
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {
    
    // All Services are singletons, using .service() or .factory() differs the way Objects are created.

    // This file gives an example of using a .factory().
    // Factories are for business logic or provider modules, return an Object or a closure.

    function underscore() {        
        return window._;
    }

    // Pass functions into module methods rather than assigning a callback.
    // This helps aid with readability and helps reduced the amount of code "wrapped"
    // inside Angular.
    angular.module('common')
    .factory('_', underscore);
    
})();