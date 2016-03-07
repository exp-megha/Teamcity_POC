//  To avoid polluting the global namespace, wrap all of your functions in an IIFE.
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {

    // All Services are singletons, using .service() or .factory() differs the way Objects are created.

    // This file gives an example of using a .factory().
    // Factories are for business logic or provider modules, return an Object or a closure.

    function notify(ngFoobar, gettext) {
        var showMessage = function(context, message) {
            ngFoobar.show(context, message);
            ngFoobar.setAutoClose(true, 5);
        };

        var success = function(content) {
            showMessage('success', content);
        };

        var error = function(content) {
            showMessage('error', content);
        };

        var warning = function(content) {
            showMessage('warning', content);
        };

        var info = function(content) {
            showMessage('info', content);
        };

        // Always return a host Object instead of the revealing module pattern.
        // This is due to the way Object references are bound and updated.
        // Primitive values cannot update alone using the revealing module pattern.
        return {
            info: info,
            success: success,
            error: error,
            warning: warning,
        };
    }

    // Pass functions into module methods rather than assigning a callback.
    // This helps aid with readability and helps reduced the amount of code "wrapped"
    // inside Angular.
    angular.module('common')
    .factory('notify', notify);

})();
