//  To avoid polluting the global namespace, wrap all of your functions in an IIFE. 
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {


    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('404', {
            url: '/404',
            templateUrl: 'common/templates/404.html',
        });
      

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'common/home/home.html',
            controller: 'issHomeCtrl',
            controllerAs: 'home',
           
        });
        $stateProvider.state('signup', {
            url: '/signup',
            templateUrl: 'common/Signup/Signup.html',
            controller: 'issSignupCtrl',
            controllerAs: 'signup',
           
        });

        $urlRouterProvider.otherwise("/signup");
        /* Add New States Above */
    }
 function run($rootScope, $state, $log,  AppConfig ) {

        
        // when you add it to the $rootScope variable, then it's accessible to all other
        $rootScope.safeApply = function(fn) {
            var phase = $rootScope.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    // don't worry, the value gets set and AngularJS picks up on it...
                    fn();
                }
            } else {
                //this will fire to tell angularjs to notice that a change has happened
                //if it is outside of it's own behaviour...
                this.$apply(fn);
            }
        };



    }
    angular.module('common', [])
        .config( config);
   angular.module('common').run(run);

})();