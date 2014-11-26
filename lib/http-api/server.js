var http = require('http');
var config = require('../config');
var app = require('./app');

/**
 * Create and expose http server.
 */

var server = module.exports = http.createServer(app);

/**
 * Log server address.
 */

server.on('listening', function () {
  console.log(
    'HTTP API started: http://%s:%d/',
    this.address().address,
    this.address().port
  );
});

/**
 * Start listening.
 */

server.listen(config.httpApi.port);
