var express = require('express');
var bodyParser = require('body-parser');

/**
 * Create and expose router.
 */

var router = module.exports = express.Router();

// Enable JSON body parser.
router.use(bodyParser.json());

// Mount API resources.
router.use('/bundles', require('./bundles'));
