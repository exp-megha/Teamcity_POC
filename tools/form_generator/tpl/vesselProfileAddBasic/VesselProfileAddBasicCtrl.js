(function() {

function xpVesselProfileAddBasicCtrl($scope, $state, $log, gettext, masterData, xpVesselProfileAddBasicService ) {
    var vm=this;
	    var initialData="";
	
	// form submission
	vm.onSubmit = function() {
		
		xpVesselProfileAddBasicService.save(vm.formData)
		.then(function() {
			$scope.vesselProfileAddBasic.$setPristine();
            initialData = angular.copy(vm.formData); 
			
			    $state.go(/{customerId}/vessel/{vesselId}/{vesselId}/particulars/{id});

			
		}, function() {

			// error should be displayed here
			vm.errorMessage = gettext('errorMessage');
		});
	};


	
             
	vm.onReset = function(param) {
            vm.formData = angular.copy(initialData);
    $scope.vesselProfileAddBasic.$setPristine();
		      
	};

	
	}
angular.module("vessel").controller('xpVesselProfileAddBasicCtrl', xpVesselProfileAddBasicCtrl);
})();