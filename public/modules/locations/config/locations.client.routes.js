'use strict';

//Setting up route
angular.module('locations').config(['$stateProvider',
	function($stateProvider) {
		// Locations state routing
		$stateProvider.
		state('locations', {
			url: '/locations',
			templateUrl: 'modules/locations/views/locations.client.view.html'
		}).
		state('viewLocation', {
			url: '/locations/:locationId',
			templateUrl: 'modules/locations/views/view-location.client.view.html'
		});
	}
]);
