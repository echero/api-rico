const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const axios = require("axios");
const restaurantes = require("../data/Restaurant");
const index = require("../index");
const { expect } = chai;
chai.use(chaiHttp);

describe("API RICO SEARCH", () => {
  it('#status property "status"', function () {
    var res = { status: 200 };
    res.should.to.have.status(200);

    (function () {
      res.should.not.have.status(200);
    }).should.throw('expected { status: 200 } to not have status code 200');

    (function () {
      ({}).should.not.to.have.status(200);
    }).should.throw("expected {} to have keys 'status', or 'statusCode'");
  });
  it('succeeds when response has an error status', function (done) {
    request('https://httpbin.org')
      .get('/status/400')
      .end(function (err, res) {
        res.should.have.status(400);
        done(err);
      });
  });
  it('can be augmented with promises', function (done) {
    request('https://httpbin.org')
      .get('/get')
      .set('X-API-Key', 'test3')
      .then(function (res) {
        res.should.have.status(200);
        res.body.headers['X-Api-Key'].should.equal('test3');
        throw new Error('Testing catch');
      })
      t('can resolve a promise given status code of 400', function () {
        return request('https://httpbin.org')
          .get('/status/400')
          .then(function (res) {
            res.should.have.status(400);
          });
      });
    });
  it('#param', function () {
    var req = { url: '/test?x=y&foo=bar' };
    req.should.have.param('x');
    req.should.have.param('foo');
    req.should.have.param('x', 'y');
    req.should.have.param('foo', 'bar');
    req.should.not.have.param('bar');
    req.should.not.have.param('y');
    req.should.not.have.param('x', 'z');
    req.should.not.have.param('foo', 'baz');

    (function () {
      req.should.not.have.param('foo');
    }).should.throw(/expected .* to not have property \'foo\'/);

    (function () {
      req.should.not.have.param('foo', 'bar');
    }).should.throw(/expected .* to not have property \'foo\' of \'bar\'/);
  });

  describe("GET /search?q=name", () => {
    it("Trae todos los restaurant que consiga que contiene la palabra que recibo por query string", () => {
      chai
        .request(index)
        .get("/search")
        .end((_, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(JSON.parse(res.text));
          const item = restaurantes
            .filter((e) => res.text.toLowerCase.name === e.name)
            .to.eql([item]);
        });
    });
  });
  it("Trae todos los datos de un restaurante", () => {
    chai
      .request(index)
      .get("/search")
      .end((_, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(JSON.parse(res.text));
        const itemId = restaurantes
          .find((e) => res.text.toLowerCase.id === e.id)
          .to.eql({ itemId });
      });
  });
  it("No consiguio ningun restaurante por la palabra enviada por query string", () => {
    chai
      .request(index)
      .get("/search")
      .end((_, res) => {
        expect(res).to.have.status(404)
        expect(res).to.be.json
        expect(JSON.parse(res.text))
          .to.eql({ message: "Restaurantes no encontrados" })          
      })
  });
});
