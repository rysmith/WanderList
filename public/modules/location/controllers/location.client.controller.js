'use strict';

angular.module('location').controller('LocationController', ['$scope', '$location', 'Location',
	function($scope, $location, Location) {

		$scope.search = function () {
			var location = new Location({
				location: this.location
			});
			console.log(location);
			//location.$save(function (response) {
			//	$location.path('locations/' + response._id);
            //
			//	$scope.title = '';
			//	$scope.content = '';
			//}, function (errorResponse) {
			//	$scope.error = errorResponse.data.message;
			//});
		};
	}
]);


