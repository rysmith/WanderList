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
	location: {
		type: Number,
		default: '',
		trim: true,
		required: 'Location cannot be blank'
	}

});

mongoose.model('Location', LocationSchema);
