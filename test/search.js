const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const restaurantes = require("../data/Restaurant");
const index = require("../index");
const { expect } = chai;
chai.use(chaiHttp);

describe("API RICO SEARCH", () => {
  describe("GET /search?q=name", () => {
    
  it("Propiedad de #status", function () {
    chai
      .request(index)
      .get("/search")
      .end((_, res) => {
        res.should.to.have.status(200);

        (function () {
          res.should.not.have.status(200);
        }.should.throw("Se esperaba (status: 200)"));

        (function () {
          ({}.should.not.to.have.status(200));
        }.should.throw("Se esperaba claves de 'status' o 'statusCode'"));
      });
  });

  it("Tiene éxito cuando la respuesta tiene un estado de error", async () => {
    chai
      .request(index)
      .get("/search")
      .end((err, res) => {
        res.should.to.have.status(400);
        expect(JSON.parse(res.text)).to.eql({
          message: "Restaurant no encontrado",
        });
        done(err);
      });
  });

  // it("#param", function () {
  //   chai
  //     .request(index)
  //     .get("/search?q=name")
  //     .end((err, req, res) => {
  //       req.should.to.have.param("q");
  //       req.should.have.param("name");
  //       req.should.not.have.param("q");
  //       req.should.not.have.param("name");

  //       (function () {
  //         req.should.not.have.param("q");
  //       }.should.throw(/espera .* pero no tiene propiedad \'q\'/));

  //       (function () {
  //         req.should.not.have.param("q", "name");
  //       }.should.throw(/espera .* pero no tiene propiedad \'q\' of \'name\'/));
  //     });
  // });

  
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
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(JSON.parse(res.text)).to.eql({
          message: "Restaurantes no encontrados",
        });
      });
  });
});
});
