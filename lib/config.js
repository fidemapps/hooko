var dockerHost = require('docker-host')().host || 'localhost';

/**
 * Expose configuration.
 */

module.exports = {
  httpApi: {
    port: 3000
  },
  mongo: {
    // To ensure that Mac and Linux are supported.
    uri: 'mongodb://' + dockerHost + '/test'
  }
};
