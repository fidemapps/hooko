var db = require('../db');
require('./bundle');

var actionSchema = new db.Schema({
  name: {type: String, required: true},
  bundle: {type: db.Schema.Types.ObjectId, ref: 'Bundle'},
  body: {type: String},
  state: {type: String, default: 'active', enum: ['complete', 'failed', 'active']}
});

/**
 * Create and expose model.
 */

module.exports = db.model('Action', actionSchema);
