'use strict';

// Location module config
angular.module('locations').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Search Location', 'locations', 'locations');
	}
]);
