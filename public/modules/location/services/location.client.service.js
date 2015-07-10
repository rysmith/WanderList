'use strict';

angular.module('location').factory('Location', ['$resource',
	function($resource) {
		return $resource('location/:locationId', {
			locationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
