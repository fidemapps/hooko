var dockerHost = require('docker-host')().host || 'localhost';
var dbHost = process.env.DB_PORT_27017_TCP_ADDR || dockerHost;

/**
 * Expose configuration.
 */

module.exports = {
  httpApi: {
    port: 3000
  },
  mongo: {
    // To ensure that Mac and Linux are supported.
    uri: 'mongodb://' + dbHost + '/hooko'
  }
};
