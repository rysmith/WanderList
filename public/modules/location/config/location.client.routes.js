'use strict';

//Setting up route
angular.module('location').config(['$stateProvider',
	function($stateProvider) {
		// Location state routing
		$stateProvider.
		state('location', {
			url: '/location',
			templateUrl: 'modules/location/views/location.client.view.html'
		});
	}
]);