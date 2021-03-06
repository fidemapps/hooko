'use strict';

var dockerHost = 'localhost';
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
  dockerHost = require('docker-host')().host || 'localhost';
var dbHost = process.env.DB_PORT_27017_TCP_ADDR || dockerHost;

/**
 * Expose configuration.
 */

module.exports = {
  httpApi: {
    port: process.env.PORT || 3000
  },
  mongo: {
    // To ensure that Mac and Linux are supported.
    uri: process.env.MONGO_URL || 'mongodb://' + dbHost + '/hooko'
  },
  sqs: {
    aws: {
      region: process.env.AWS_REGION || 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET
    },
    name: process.env.QUEUE_NAME || 'hooko',
    prefix: process.env.QUEUE_PREFIX
  },
  scheduler: {
    intervalTime: 5000
  }
};
