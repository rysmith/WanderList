'use strict';

angular.module('locations').factory('Locations', ['$resource',
	function($resource) {
		return $resource('locations/:locationId', {
			locationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
