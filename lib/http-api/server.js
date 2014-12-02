var http = require('http');
var app = require('./app');
var logger = require('../logger');

/**
 * Create and expose http server.
 */

var server = module.exports = http.createServer(app);

/**
 * Log server address.
 */

server.on('listening', function () {
  logger.info(
    'HTTP API started: http://%s:%d/',
    this.address().address,
    this.address().port
  );
});
