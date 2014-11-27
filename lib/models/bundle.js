var db = require('../db');

var hookSchema = new db.Schema({
  name: {type: 'String', required: true},
  url: {type: 'String', required: true}
});

var bundleSchema = new db.Schema({
  name: {type: String, required: true},
  state: {type: String, default: 'active', enum: ['active', 'paused']},
  hooks: [hookSchema]
});

/**
 * Create and expose model.
 */

module.exports = db.model('Bundle', bundleSchema);
