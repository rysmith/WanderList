'use strict';

angular.module('locations').controller('LocationsController', ['$scope', '$location', 'Authentication', 'Locations',
	function($scope, $location, Authentication, Locations) {
        $scope.authentication = Authentication;

		$scope.search = function () {
			var location = new Locations({
				location: this.location
			});
			location.$save(function (response) {
				console.log(response.region[0].latitude[0]);
                $scope.zillowCharts = response.charts[0].chart;
                $scope.zillowDemographics = response.pages[0].page[2].tables[0].table[0].data[0].attribute;
                $scope.zillowRegion = response.region[0];
				$scope.location = '';
                var currentSearchLocation = new google.maps.LatLng(response.region[0].latitude[0], response.region[0].longitude[0]);
                if (response) {
                    $scope.map.setCenter(currentSearchLocation);
                }
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
        $scope.oneAtATime = true;

	}
]);


