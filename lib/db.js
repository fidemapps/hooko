var config = require('./config');
var mongoose = require('mongoose');
var logger = require('./logger');

/**
 * Connect and expose mongoose.
 */

var mongoose = module.exports = mongoose.connect(config.mongo.uri);

mongoose.connection.on('error', function (err) {
  logger.error('Mongoose error', err);
});
