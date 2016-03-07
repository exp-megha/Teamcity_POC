(function() {

function xp<%- @formalFormName %>Ctrl($scope, $state, $log, gettext, masterData, xp<%- @formalFormName %>Service <% if @initUrl.status ? 1 :  %>, initialData <% end %>) {
    var vm=this;
	<% if @initUrl.status ? 1 :  %> vm.formData = angular.copy(initialData);
    <% else :%>
    var initialData="";
	<% end %>

	// form submission
	vm.onSubmit = function() {
		
		xp<%- @formalFormName %>Service.save(vm.formData)
		.then(function() {
			$scope.<%- @formName %>.$setPristine();
            initialData = angular.copy(vm.formData); 
			<% if @nextUrl.status ? 1 :  %>

			    $state.go(<%- @nextUrl.url %>);

			<% else : %>

                vm.successMessage = gettext('<%- @successMessage %>');

			<% end %>

		}, function() {

			// error should be displayed here
			vm.errorMessage = gettext('<%- @errorMessage %>');
		});
	};


<% if @events?.length : %>
	
    <% for event in @events : %>
         
	vm.<%- event %> = function(param) {
        <% if event == 'onReset':%>
    vm.formData = angular.copy(initialData);
    $scope.<%- @formName %>.$setPristine();
<% end %>
		      
	};

	<% end %>
<% end %>

	}
angular.module("<%- @module %>").controller('xp<%- @formalFormName %>Ctrl', xp<%- @formalFormName %>Ctrl);
})();