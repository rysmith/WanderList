'use strict';

angular.module('locations').controller('LocationsController', ['$scope', '$location', 'Authentication', 'Locations',
	function($scope, $location, Authentication, Locations) {

        $scope.authentication = Authentication;

		$scope.search = function () {
			var location = new Locations({
				location: this.location
			});
			console.log(location);
			location.$save(function (response) {
				//$location.path('locations/' + response._id);
				console.log(response);

				$scope.location = '';
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);


