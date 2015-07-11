'use strict';

var users = require('../../app/controllers/users.server.controller'),
    locations = require('../../app/controllers/locations.server.controller');


module.exports = function(app) {
    // location Routes
    app.route('/locations')
        .get(locations.list)
        .post(users.requiresLogin, locations.search);

    //app.route('/locations/:locationId')
    //    .get(locations.read);
        //.put(users.requiresLogin, locations.hasAuthorization, locations.update)
        //.delete(users.requiresLogin, locations.hasAuthorization, locations.delete);

     //Finish by binding the article middleware
    //app.param('locationId', locations.locationsByID);
};
