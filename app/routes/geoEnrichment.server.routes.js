'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	geoEnrichment = require('../../app/controllers/geoEnrichment.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/geoEnrichment')
		.get(geoEnrichment.list);
		// .post(users.requiresLogin, geoEnrichment.create);

	// app.route('/geoEnrichment/:geoEnrichmentId')
	// 	.get(articles.read)
	// 	.put(users.requiresLogin, articles.hasAuthorization, articles.update)
	// 	.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

	// Finish by binding the article middleware
	// app.param('geoEnrichmentId', geoEnrichment.geoEnrichmentByID);
};
