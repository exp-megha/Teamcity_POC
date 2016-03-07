//  To avoid polluting the global namespace, wrap all of your functions in an IIFE. 
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {

    // Create global filters using angular.filter() only. Never use local filters inside
    // controllers/services. This enhances testing and reusability.
    function <%= _.camelize(name) %>() {
        return function(items) {
            return items.filter(function(item) {
                return true;
            })
        }
    }

    // Pass functions into module methods rather than assigning a callback.
    // This helps aid with readability and helps reduced the amount of code "wrapped"
    // inside Angular.
    angular.module('<%= appname %>')
    .filter('<%= _.camelize(name) %>', <%= _.camelize(name) %>)
})();