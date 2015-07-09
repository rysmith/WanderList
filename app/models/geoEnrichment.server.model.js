'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var geoEnrichmentSchema = new Schema({

});

mongoose.model('geoEnrichment', geoEnrichmentSchema);
