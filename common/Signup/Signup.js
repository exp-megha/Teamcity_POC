//  To avoid polluting the global namespace, wrap all of your functions in an IIFE. 
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {

    // Use ControllerAs syntax which uses 'this' inside controllers and binds to $scope.
    // Only use $scope as a special use case. Examples of these include:
    // $emit, $broadcast, $on, $watch.
    // Try to keep the use of $scope to a minimum.

    // Presentational logic only inside a controller. Business logic should be delegated to a service.
    function SignupCtrl() {



    }
    

    // Pass functions into module methods rather than assigning a callback.
    // This helps aid with readability and helps reduced the amount of code "wrapped"
    // inside Angular.
    angular.module('common')
    .controller('issSignupCtrl', SignupCtrl);
})();