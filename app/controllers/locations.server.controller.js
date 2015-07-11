'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    request = require('request'),
    errorHandler = require('./errors.server.controller'),
    Location = mongoose.model('Location');

exports.search = function(req, res) {

    console.log(req.body);

    var getGeoData = function(callback) {
        request.post({
            url: 'http://geoenrich.arcgis.com/arcgis/rest/services/World/GeoenrichmentServer/Geoenrichment/enrich',
            json:true,
            form: {
                f: 'json',
                token: process.env.ESRI_TEMP_TOKEN,
                studyAreas: '[{"address":{"text":"601 E. Anapamu Street, Santa Barbara"}}]'
            }
        }, function(error, response, body){
            console.log(body.results[0].value.FeatureSet[0]);
            callback(body.results[0].value.FeatureSet[0].features[0]);
        });
    }; // end of getGeoData

    getGeoData(function(geoResponse) {

        var location = new Location(geoResponse);

        location.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                return res.json(geoResponse);
            }
        });
    });

}; // end of search

/**
 * Create a Location
 */
exports.create = function(req, res) {

};

/**
 * Show the current Location
 */
exports.read = function(req, res) {

};

/**
 * Update a Location
 */
exports.update = function(req, res) {

};

/**
 * Delete an Location
 */
exports.delete = function(req, res) {

};

/**
 * List of Locations
 */
exports.list = function(req, res) {
    console.log(req);
};
