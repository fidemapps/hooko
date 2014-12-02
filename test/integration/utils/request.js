var supertest = require('supertest');

/**
 * Return supertest with a preconfigured url.
 *
 * @returns {supertest}
 */

module.exports = function () {
  return supertest(process.env.HOOKO_API_URL);
};
