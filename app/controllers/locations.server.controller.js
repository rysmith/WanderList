'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    request = require('request');

exports.search = function(req, res) {
    console.log('requests are coming in on create');
    console.log(req.body);


    var getGeoData = function(callback) {
        request.post({
            url: 'http://geoenrich.arcgis.com/arcgis/rest/services/World/GeoenrichmentServer/Geoenrichment/enrich',
            json:true,
            form: {
                f: 'json',
                token: process.env.ESRI_TEMP_TOKEN,
                studyAreas: '[{"geometry":{"x":-117.1956,"y":34.0572}}]'
            }
        }, function(error, response, body){
            console.log(body.results[0].value.FeatureSet[0]);
            callback(body.results[0].value.FeatureSet[0].features[0]);
        });
    };

    getGeoData(function(geoResponse) {
        return res.json(geoResponse);
    })

};

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
