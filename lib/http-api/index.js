'use strict';

var config = require('../config');
var server = require('./server');

/**
 * Start listening.
 */

server.listen(config.httpApi.port);
