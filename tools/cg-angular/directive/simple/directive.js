//  To avoid polluting the global namespace, wrap all of your functions in an IIFE. 
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {

    // Never prefix custom directives with 'ng-*', they might conflict future native directives.
    // Directives and filters are the only providers that have camelCase as a strict naming convention.
    // Angular hyphenates camelCase so dragUpload will become '<div drag-upload></div>'.
    function <%= _.camelize(name) %>() {
        return {

            // Only use custom element (E) and custom attribute (A) methods for declaring your 
            // directives depending on its role. Comments (M) and classes (C) declarations are confusing 
            // and should be avoided. Attributes give the best cross browser support.
            restrict: 'EA',

            // Use Array.join('') for clean templating. It improves readability as code can be indented properly.
            // It also avoids the + operator which is less clean and can lead to errors if used incorrectly
            // on split lines. 
            template: [
                '<div class="some-directive">',
                    '<h1>{{<%= _.camelize(name) %>.title}}</h1>',
                '</div>'
            ].join(''),

            // Use the controllerAs syntax inside directives as well.
            // See above in the template for how it is used.
            controllerAs: '<%= _.camelize(name) %>',

            // ControllerAs syntax means that the scope is bound to 'this'.
            controller: function() {
                this.title = 'As Generated using Yoeman...!!';
            },

            // DOM manipulation can take place only inside directives. Do not put this logic into a controller/service.
            link: function(scope, element, attrs, controllers) {
                
            }
        }
    };

    // Pass functions into module methods rather than assigning a callback.
    // This helps aid with readability and helps reduced the amount of code "wrapped"
    // inside Angular.
    angular.module('<%= appname %>')
    .directive('<%= _.camelize(name) %>', <%= _.camelize(name) %>); 
})();