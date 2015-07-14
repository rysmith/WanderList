'use strict';

angular.module('locations').controller('LocationsController', ['$scope', '$location', 'Authentication', 'Locations',
	function($scope, $location, Authentication, Locations) {
        $scope.authentication = Authentication;

		$scope.search = function () {
			var location = new Locations({
				location: this.location
			});
			location.$save(function (response) {
				//$location.path('locations/' + response._id);
				console.log(response);
                $scope.zillowCharts = response.charts[0].chart;
                $scope.zillowDemographics = response.pages[0].page[2].tables[0].table[0].data[0].attribute;
                $scope.zillowRegion = response.region[0];
				$scope.location = '';
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

        $scope.oneAtATime = true;

        $scope.groups = [
            {
                title: 'Dynamic Group Header - 1',
                content: 'Dynamic Group Body - 1'
            },
            {
                title: 'Dynamic Group Header - 2',
                content: 'Dynamic Group Body - 2'
            }
        ];

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

	}
]);


