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
  },
  sqs: {
    aws: {
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET
    },
    name: process.env.QUEUE_NAME,
    prefix: process.env.QUEUE_PREFIX
  },
  scheduler: {
    intervalTime: 5000
  }
};
