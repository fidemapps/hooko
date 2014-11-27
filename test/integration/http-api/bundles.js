var expect = require('chai').expect;
var cli = require('../utils/cli');
var request = require('../utils/request');

describe('HTTP API bundles', function () {
  before(function (done) {
    cli.run('db:drop', done);
  });

  describe('POST /api/bundles', function () {
    it('should return an error without name', function (done) {
      request()
      .post('/api/bundles')
      .send({})
      .expect(400)
      .expect(function (res) {
        expect(res).to.have.deep.property('body.error.message', 'Validation failed');
      })
      .end(done);
    });

    it('should add the bundle', function (done) {
      request()
      .post('/api/bundles')
      .send({name: 'bundle01'})
      .expect(201)
      .end(done);
    });
  });

  describe('GET /api/bundles', function () {
    it('should list bundles', function (done) {
      request()
      .get('/api/bundles')
      .expect(200)
      .expect(function (res) {
        expect(res).to.have.deep.property('body[0].name', 'bundle01');
      })
      .end(done);
    });
  });

  describe('PATCH /api/bundles/:name', function () {
    it('should return an error with an invalid state', function (done) {
      request()
      .patch('/api/bundles/bundle01')
      .send({state: 'invalid state'})
      .expect(400)
      .expect(function (res) {
        expect(res).to.have.deep.property('body.error.message', 'Validation failed');
      })
      .end(done);
    });

    it('should modify the bundle', function (done) {
      request()
      .patch('/api/bundles/bundle01')
      .send({state: 'paused'})
      .expect(200)
      .expect(function (res) {
        expect(res).to.have.deep.property('body.state', 'paused');
      })
      .end(done);
    });
  });

  describe('DELETE /api/bundles/:name', function () {
    it('should destroy the bundle', function (done) {
      request()
      .delete('/api/bundles/bundle01')
      .expect(200)
      .end(done);
    });

    it('should return an empty list', function (done) {
      request()
      .get('/api/bundles')
      .expect(200)
      .expect(function (res) {
        expect(res.body).to.length(0);
      })
      .end(done);
    });
  });
});
