var supertest = require('supertest');
var expect = require('chai').expect;
var cli = require('../utils/cli');
var request = require('../utils/request');

describe('HTTP API hooks', function () {
  before(function (done) {
    cli.run('db:drop', done);
  });

  before(function (done) {
    request()
    .post('/api/bundles')
    .send({name: 'bundle01'})
    .end(done);
  });

  describe('POST /api/bundles/:bundle/hooks', function () {
    it('should return an error without name', function (done) {
      request()
      .post('/api/bundles/bundle01/hooks')
      .send({})
      .expect(400)
      .expect(function (res) {
        expect(res).to.have.deep.property('body.error.message', 'Validation failed');
      })
      .end(done);
    });

    it('should add the hook', function (done) {
      request()
      .post('/api/bundles/bundle01/hooks')
      .send({name: 'hook01', url: 'http://google.com'})
      .expect(201)
      .end(done);
    });
  });

  describe('GET /api/bundles/:bundle/hooks', function () {
    it('should list hooks', function (done) {
      request()
      .get('/api/bundles/bundle01/hooks')
      .expect(200)
      .expect(function (res) {
        expect(res).to.have.deep.property('body[0].name', 'hook01');
      })
      .end(done);
    });
  });

  describe('PATCH /api/bundles/:bundle/hooks/:id', function () {
    var hookId;

    before(function (done) {
      request()
      .get('/api/bundles/bundle01/hooks')
      .end(function (err, res) {
        if (err) return done(err);
        hookId = res.body[0]._id;
        done();
      });
    });

    it('should return an error without name', function (done) {
      request()
      .patch('/api/bundles/bundle01/hooks/' + hookId)
      .send({name: null})
      .expect(400)
      .expect(function (res) {
        expect(res).to.have.deep.property('body.error.message', 'Validation failed');
      })
      .end(done);
    });

    it('should update the hook', function (done) {
      request()
      .patch('/api/bundles/bundle01/hooks/' + hookId)
      .send({name: 'hook02'})
      .expect(200)
      .expect(function (res) {
        expect(res).to.have.deep.property('body.name', 'hook02');
      })
      .end(done);
    });
  });

  describe('DELETE /api/bundles/:name', function () {
    var hookId;

    before(function (done) {
      request()
      .get('/api/bundles/bundle01/hooks')
      .end(function (err, res) {
        if (err) return done(err);
        hookId = res.body[0]._id;
        done();
      });
    });

    it('should destroy the bundle', function (done) {
      request()
      .delete('/api/bundles/bundle01/hooks/' + hookId)
      .expect(200)
      .end(done);
    });

    it('should return an empty list', function (done) {
      request()
      .get('/api/bundles/bundle01/hooks')
      .expect(200)
      .expect(function (res) {
        expect(res.body).to.length(0);
      })
      .end(done);
    });
  });
});
