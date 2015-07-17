'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    request = require('request'),
    errorHandler = require('./errors.server.controller'),
    Location = mongoose.model('Location'),
    parseString = require('xml2js').parseString,
    Forecast = require('forecast.io');

// search for data related to the users input (city and state)
exports.search = function(req, res) {

    // new up a new object to pass back to the view with the API responses
    var apiResponse = {};

    // API key for weather data, not currently in use
    var options = {
            APIKey: process.env.FORECAST_API_KEY,
            timeout: 1000
        },
        forecast = new Forecast(options);

    // add this to zillow call back to get lat/lon data
    forecast.get(37.8267, -122.423, function (err, res, data) {
        if (err) throw err;
        console.log('res: ' + res);
        console.log('data: ' + data);
    });

    // get data from zillow: home prices and demographics
    var getZillowData = function(callback) {

        // parse the user input
        // expects: city, state
        var cityState = req.body.location.split(',');

        // grab the city and trim trailing white spaces
        var city = cityState[0].trim();

        // grab the state and trim trailing white spaces
        var state = cityState[1].trim();

        // send the POST request over to the zillow API using the request module
        request.post({
            'url': 'http://www.zillow.com/webservice/GetDemographics.htm',
            form: {
                'zws-id': process.env.ZILLO_TOKEN,
                'city': '"' + city + '"',
                'state': '"' + state + '"'
            }
        }, function(error, response, body) {
            callback(body);
        });
    };

    // set up the environmental variables for the yelp API call
    var yelp = require('yelp').createClient({
        consumer_key: process.env.YELP_KEY,
        consumer_secret: process.env.YELP_SECRET,
        token: process.env.YELP_TOKEN,
        token_secret: process.env.YELP_TOKEN_SECRET
    });

    // get and parse zillow data, then build into the API response object
    getZillowData(function(zilloResponse) {

        // convert XML to json with parseString module
        parseString(zilloResponse, function (err, result) {

            // log the message from zillow to check API usage warnings
            console.log(result['Demographics:demographics'].message[0]);

            // update the apiResponse object with the zillow response
            apiResponse.zillow = result['Demographics:demographics'].response[0];

            // if yelp API call is completed, go ahead and send the response back to the view
            // otherwise do nothing
            if (apiResponse.zillow && apiResponse.yelp) {
                res.send(apiResponse);
            }
        });
    });

    // get data from yelp: restaurant information
    yelp.search({term: 'food', location: '"' + req.body.location + '"'}, function(error, data) {

        // build yelp response into the API response object
        apiResponse.yelp = data;

        // if zillow API call is completed, go ahead and send the response back to the view
        // otherwise do nothing
        if (apiResponse.zillow && apiResponse.yelp) {
            res.send(apiResponse);
        }
    });

}; // end of search

// get geographic data from ArcGIS
// not currently in use
exports.searchERSI = function(req, res) {

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
    // parse the search results
    parseSearch(req, res, function(parsedResponse) {
        console.log(parsedResponse);
        return res.json(parsedResponse);
    });

    // once the geographic data is received check to see if it's already in the db, if not, save it
    // currently for an address or a city name
    getGeoData(req, res, function(geoResponse) {

        var location = new Location(geoResponse);

        Location.find().populate('_id', 'attributes').exec(function(err, locations) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                for (var i in locations) {
                    if ( locations[i].attributes.X === location.attributes.X && locations[i].attributes.Y === location.attributes.Y ) {
                        console.log('we have a match for array index ' + i + ' so we will not save');
                        return res.json(geoResponse);
                    }
                }

                location.save(function(err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        return res.json(geoResponse);
                    }
                });

            }
        }); // end of Location.find
    }); // end of getGeoData
};

/**
 * List of Locations
 * Not currently in use
 */
exports.list = function(req, res) {
    console.log(req);
};
