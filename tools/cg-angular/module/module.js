//  To avoid polluting the global namespace, wrap all of your functions in an IIFE. 
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {

<% if (!uirouter) { %>
    function config($routeProvider) {

    	/* Add New Routes Above */

    }

    angular.module('<%= _.camelize(name) %>', ['ui.bootstrap','ui.utils','<%= routerModuleName %>','ngAnimate'])
        .config(['$routeProvider', config]);

<% } %><% if (uirouter) { %>
    function config($stateProvider, $urlRouterProvider) {

		/* Add New States Above */

    }

    angular.module('<%= _.camelize(name) %>', ['ui.bootstrap','ui.utils','<%= routerModuleName %>','ngAnimate'])
        .config(['$stateProvider', '$urlRouterProvider', config]);

<% } %>

})();