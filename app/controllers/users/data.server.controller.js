'use strict';

var request = require('request'); // npm install request

// generate a token with your client id and client secret
function getToken(callback){
  request.post({
    url: 'https://www.arcgis.com/sharing/rest/oauth2/token/',
    json:true,
    form: {
      'f': 'json',
      'client_id': '8fGZ5Sg9QzfWu0Lc',
      'client_secret': 'fcf940813e67440dba5335a0fc1b9f3a',
      'grant_type': 'client_credentials',
      'expiration': '1440'
    }
  }, function(error, response, body){
    console.log(body.access_token);
    callback(body.access_token);
  });
}

getToken(function(token){
  // sample post to GeoEnrichment REST API
  // returns demographic information for a one mile radius around a point
  request.post({
    url: 'http://geoenrich.arcgis.com/arcgis/rest/services/World/GeoenrichmentServer/Geoenrichment/enrich',
    json:true,
    form: {
      f: 'json',
      token: token,
      studyAreas: '[{"geometry":{"x":-117.1956,"y":34.0572}}]'
    }
  }, function(error, response, body){
    console.log(body);
  });
});
