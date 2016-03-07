//  To avoid polluting the global namespace, wrap all of your functions in an IIFE. 
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {

    // Use ControllerAs syntax which uses 'this' inside controllers and binds to $scope.
    // Only use $scope as a special use case. Examples of these include:
    // $emit, $broadcast, $on, $watch.
    // Try to keep the use of $scope to a minimum.

    // Presentational logic only inside a controller. Business logic should be delegated to a service.
    function <%= ctrlname %>(UserService) {

        // Capture the 'this' context of the controller using vm, standing for ViewModel.
        // Use it to avoid having to call bind and unnecessary scoping issues.
        var vm = this;

        vm.someObject = 'Some value';

        vm.users = [];
        vm.getUsers = function() {
            
            // Business logic being delegated to a service.
            // Controllers should act as a ViewModel and control the data flowing between the Model and
            // the View presentation layer. Business logic in Controllers makes testing Services impossible.
            UserService.getUsers()
            .then(function(response) {
                vm.users = response;
            });
        };

    }
    
    // Check the 'app.js' config function to see where this is used and an explanation.
    <%= ctrlname %>.resolve = {
        doSomething: function() {
            return UserService.doSomething();
        }
    };

    // Pass functions into module methods rather than assigning a callback.
    // This helps aid with readability and helps reduced the amount of code "wrapped"
    // inside Angular.
    angular.module('<%= appname %>')
    .controller('<%= ctrlname %>', ['UserService', <%= ctrlname %>]);
})();