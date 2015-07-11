'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Location Schema
 */
var LocationSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	attributes: {
		ObjectAVGHHSZ: Number, //float
		HasData: Number, // int
		ID: String, //quoted number eg "0"
		OBJECTID: Number, //int
		TOTFEMALES: Number, //int
		TOTHH: Number, //int
		TOTMALES: Number, //int
		TOTPOP: Number, //int
		X: Number, //float
		Y: Number, //float
		areaType: String,
		bufferRadii: Number, //int
		bufferUnits: String,
		bufferUnitsAlias: String,
		sourceCountry: String
	}
});

mongoose.model('Location', LocationSchema);
