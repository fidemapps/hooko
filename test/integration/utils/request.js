var supertest = require('supertest');

/**
 * Return supertest with a preconfigured url.
 *
 * @returns {supertest}
 */

module.exports = function () {
  return supertest('http://localhost:3000');
};
