'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});

		//uiGmapGoogleMapApiProvider.configure({
		//	key: 'AIzaSyC7LiXGLghrpTQfhC-wc1ToUkN7FbTDe0c',
		//	v: '3.17',
		//	libraries: 'weather,geometry,visualization'
		//});
	}
]);
