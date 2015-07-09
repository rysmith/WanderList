'use strict';

//Setting up route
angular.module('location-search').config(['$stateProvider',
	function($stateProvider) {
		// Location search state routing
		$stateProvider.
		state('location-search', {
			url: '/location-search',
			templateUrl: 'modules/location-search/views/location-search.client.view.html'
		});
	}
]);