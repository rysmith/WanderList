'use strict';

angular.module('locations').controller('LocationsController', ['$scope', '$location', 'Authentication', 'Locations',
	function($scope, $location, Authentication, Locations) {

		// don't allow search without login
		// redirect to signin
        $scope.authentication = Authentication;

		// get the search data from the user and send to the backend
		$scope.search = function () {

			// new up a new $resource object so we can use $save (aka POST)
			var location = new Locations({
				location: this.location
			});

			// send the user's input to the backend
			//once we get a response, make the data available to the view with $scope
			location.$save(function (response) {

				// charts from zillow
                $scope.zillowCharts = response.zillow.charts[0].chart;

				// demographics from zillow
                $scope.zillowDemographics = response.zillow.pages[0].page[2].tables[0].table[0].data[0].attribute;

				// latitude and longitude information from zillow
                $scope.zillowRegion = response.zillow.region[0];

				// restaurant information from yelp
				$scope.yelp = response.yelp.businesses;

				// clear the search form
                $scope.location = '';

				// update the google map object with the lat/log returned from zillow
                var currentSearchLocation = new google.maps.LatLng(response.zillow.region[0].latitude[0], response.zillow.region[0].longitude[0]);

				// wait for the server response before setting the map center
				if (response) {
                    $scope.map.setCenter(currentSearchLocation);
                }

				// error handling
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		//open accordions one at a time
        $scope.oneAtATime = true;
	}
]);


