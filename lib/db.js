var config = require('./config');
var mongoose = require('mongoose');

/**
 * Connect and expose mongoose.
 */

module.exports = mongoose.connect(config.mongo.uri);
