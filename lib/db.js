'use strict';

var config = require('./config');
var mongoose = require('mongoose');
var logger = require('./logger');

/**
 * Connect and expose mongoose.
 */

var db = module.exports = mongoose.connect(config.mongo.uri);

db.connection.on('error', function (err) {
  logger.error('Mongoose error', err);
});
