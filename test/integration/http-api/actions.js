var expect = require('chai').expect;
var cli = require('../utils/cli');
var request = require('../utils/request');
var random = require('../utils/random');

describe('HTTP API actions', function () {
  var bundle;

  before(function () {
    bundle = random.bundle();
  });

  before(function (done) {
    cli.run('db:drop', done);
  });

  before(function (done) {
    request()
      .post('/api/bundles')
      .send({name: bundle})
      .end(done);
  });

  describe('POST /api/actions', function () {
    it('should return an error without name', function (done) {
      request()
      .post('/api/actions')
      .send({})
      .expect(400)
      .expect(function (res) {
        expect(res).to.have.deep.property('body.error.message', 'Validation failed');
      })
      .end(done);
    });

    it('should return an error without a valid bundle', function (done) {
      request()
      .post('/api/actions')
      .send({bundle: 'unknownBundle'})
      .expect(400)
      .expect(function (res) {
        expect(res).to.have.deep.property('body.error.message', 'Bundle not found');
      })
      .end(done);
    });

    it('should add action', function (done) {
      request()
      .post('/api/actions')
      .send({bundle: bundle, name: 'push', body: 'test'})
      .expect(201)
      .expect(function (res) {
        expect(res).to.have.deep.property('body.bundle.name', bundle);
        expect(res).to.have.deep.property('body.name', 'push');
        expect(res).to.have.deep.property('body.body', 'test');
        expect(res).to.have.deep.property('body.state', 'active');
      })
      .end(done);
    });
  });
});
