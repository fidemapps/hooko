var bunyan = require('bunyan');

/**
 * Create and expose logger.
 */

module.exports = bunyan.createLogger({name: 'Hooko'});
