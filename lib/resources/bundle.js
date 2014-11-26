var db = require('../db');

var hookSchema = new db.Schema({
  event: 'String',
  method: 'String',
  url: 'String'
});

var bundleSchema = new db.Schema({
  name: String,
  hooks: [hookSchema]
});

/**
 * Create and expose model.
 */

module.exports = db.model('Bundle', bundleSchema);
