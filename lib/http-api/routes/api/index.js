'use strict';

var express = require('express');
var bodyParser = require('body-parser');

/**
 * Create and expose router.
 */

var router = module.exports = new express.Router();

// Enable JSON body parser.
router.use(bodyParser.json());

// Mount API resources.
router.use('/db', require('./db'));
router.use('/bundles', require('./bundles'));
router.use('/bundles', require('./hooks'));
router.use('/actions', require('./actions'));
