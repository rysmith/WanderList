'use strict';

angular.module('locations').controller('LocationsController', ['$scope', '$location', 'Authentication', 'Locations',
	function($scope, $location, Authentication, Locations) {
        $scope.authentication = Authentication;

		$scope.search = function () {
			var location = new Locations({
				location: this.location
			});
			location.$save(function (response) {
				console.log(response.yelp);
				console.log(response.zillow.charts[0].chart);
				console.log(response.zillow.pages[0].page[2].tables[0].table[0].data[0].attribute);
				console.log(response.zillow.region[0]);
                //$scope.zillowCharts = response.zillow.charts[0].chart;
                //$scope.zillowDemographics = response.zillow.pages[0].page[2].tables[0].table[0].data[0].attribute;
                //$scope.zillowRegion = response.zillow.region[0];
				$scope.yelp = response.yelp.businesses;
                $scope.location = '';
                var currentSearchLocation = new google.maps.LatLng(response.zillow.region[0].latitude[0], response.zillow.region[0].longitude[0]);
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


