'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    request = require('request'),
    errorHandler = require('./errors.server.controller'),
    Location = mongoose.model('Location'),
    parseString = require('xml2js').parseString;

// parse the search results, currently parsing zip codes
var parseSearch = function(req, res, callback) {
    request.post({
        url: 'http://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/StandardGeographyQuery/execute',
        json:true,
        form: {
            f: 'pjson',
            token: process.env.ESRI_TEMP_TOKEN,
            sourceCountry: 'US',
            geographyIDs: '["' + req.body.location + '"]',
            geographylayers: '["US.ZIP5"]',
            returnGeometry: true,
            generalizationLevel: 5
        }
    }, function(error, response, body){
        callback(body.results[0]);
    });
};

// get geographic enrichment data from ArcGIS
var getGeoData = function(req, res, callback) {
    request.post({
        url: 'http://geoenrich.arcgis.com/arcgis/rest/services/World/GeoenrichmentServer/Geoenrichment/enrich',
        json:true,
        form: {
            f: 'json',
            token: process.env.ESRI_TEMP_TOKEN,
            studyAreas: '[{"address":{"text":"' + req.body.location + '"}}]'
        }
    }, function(error, response, body){
        callback(body.results[0].value.FeatureSet[0].features[0]);
    });
}; // end of getGeoData

var getZillowData = function(req, res, callback) {
    request.post({
        'url': 'http://www.zillow.com/webservice/GetDemographics.htm',
        form: {
            'zws-id': process.env.ZILLO_TOKEN,
            'city': "'" + req.body.location + "'",
            'state': 'CA'
        }
    }, function(error, response, body) {
        callback(body);
    });
};

exports.search = function(req, res) {

    getZillowData(req, res, function(zilloResponse) {
        parseString(zilloResponse, function (err, result) {
            console.log(result['Demographics:demographics'].message[0]);

            return res.json(result['Demographics:demographics'].response[0]);
        });
    });

    // parse the search results
    //parseSearch(req, res, function(parsedResponse) {
    //    console.log(parsedResponse);
    //    return res.json(parsedResponse)
    //});

    // once the geographic data is received check to see if it's already in the db, if not, save it
    // currently for an address or a city name
    //getGeoData(req, res, function(geoResponse) {
    //
    //    var location = new Location(geoResponse);
    //
    //    Location.find().populate('_id', 'attributes').exec(function(err, locations) {
    //        if (err) {
    //            return res.status(400).send({
    //                message: errorHandler.getErrorMessage(err)
    //            });
    //        } else {
    //            for (var i in locations) {
    //                if ( locations[i].attributes.X === location.attributes.X && locations[i].attributes.Y === location.attributes.Y ) {
    //                    console.log('we have a match for array index ' + i + ' so we will not save');
    //                    return res.json(geoResponse);
    //                }
    //            }
    //
    //            location.save(function(err) {
    //                if (err) {
    //                    return res.status(400).send({
    //                        message: errorHandler.getErrorMessage(err)
    //                    });
    //                } else {
    //                    return res.json(geoResponse);
    //                }
    //            });
    //
    //        }
    //    }); // end of Location.find
    //}); // end of getGeoData

}; // end of search


exports.searchZillo = function(req, res) {

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
