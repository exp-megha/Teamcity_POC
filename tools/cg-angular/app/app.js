//  To avoid polluting the global namespace, wrap all of your functions in an IIFE. 
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {

<% if (!uirouter) { %>
    function config($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'main/main.html',
            controllerAs: 'main',
            controller: 'MainCtrl'
            
            // Resolve Controller dependencies in the $routeProvider or $stateProvider (if using ui-router),
            // not the controller itself.
            
            // Never bind logic to the router and reference a resolve property on each controller to couple the logic.
            
            // Within your MainCtrl you would have a resolve property to call. Check 'MainCtrl.js'
            // for an example. This keeps resolve dependencies inside the same file as the controller and the router
            // free from logic.
            resolve: MainCtrl.resolve
        });

        /* Add New Routes Above */
        $routeProvider.otherwise({redirectTo:'/home'});
    }

    angular.module('<%= _.camelize(appname) %>', ['ui.bootstrap','ui.utils','<%= routerModuleName %>','ngAnimate'])
        .config(['$routeProvider', config]);
<% } %><% if (uirouter) { %>
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'main/main.html',
            controller: 'MainCtrl as main'
            
            // Resolve Controller dependencies in the $routeProvider or $stateProvider (if using ui-router),
            // not the controller itself.
            
            // Never bind logic to the router and reference a resolve property on each controller to couple the logic.
            
            // Within your MainCtrl you would have a resolve property to call. Check 'MainCtrl.js'
            // for an example. This keeps resolve dependencies inside the same file as the controller and the router
            // free from logic.
            resolve: MainCtrl.resolve
        });

        /* Add New States Above */
        $urlRouterProvider.otherwise('/home');
    }

    angular.module('<%= _.camelize(appname) %>', ['ui.bootstrap','ui.utils','<%= routerModuleName %>','ngAnimate'])
        .config(['$stateProvider', '$urlRouterProvider', config]);
<% } %>
    
})();

angular.module('<%= _.camelize(appname) %>').run(function($rootScope) {
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

});