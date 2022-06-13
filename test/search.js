const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const restaurantes = require("../data/Restaurant");
const index = require("../index");
const { expect } = chai;
chai.use(chaiHttp);

describe("API RICO SEARCH", () => {
  describe("GET /search error interno", () => {
    //done[✔]
    it("Tiene éxito cuando la respuesta tiene un estado de error", async () => {
      chai
        .request(index)
        .get("/search")
        .query({ q: "_" })
        .end((_, res) => {
          console.log("restaurant", res.body);
          expect(res).to.have.status(404);
          expect(JSON.parse(res.text))
        });
    });

    describe("GET /search?q=name", () => {
      //done [✔]
      it("Trae todos los restaurant que consiga que contiene la palabra que recibo por query string", () => {
        chai
          .request(index)
          .get("/search")
          .query({ q: "La Pescadorita" })
          .end((_, res) => {
            console.log("restaurants", res.body);
            expect(res).to.have.status(200);
            expect(res).to.be.json;
          });
      });
    });

    describe("GET /search?q=name trae la informacion de un restaurante", () => {
      it("Trae todos los datos del restaurante buscado", () => {
        chai
          .request(index)
          .get("/search")
          .query({ q: "La Pescadorita" })
          .end((_, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(JSON.parse(res.text))
            .to.eql([
              {
                id: 3,
                name: "La Pescadorita",
                direction: "Humboldt 1905",
                horario: "9am-23pm",
                tipoRestaurante: "Mariscos",
                telefono: 798778,
              },
            ]);
          });
      });
    });
    describe("GET /search?q=name no existe el nombre buscado", () => {
      //done
      it("No consiguio ningun restaurante por la palabra enviada por query params", () => {
        chai
          .request(index)
          .get("/search")
          .query({ q: "Pizzarica" })
          .end((_, res) => {
            console.log("restaurant", res.body);
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            expect(JSON.parse(res.text)).to.not.eql([
              {
                id: 1,
                name: "Avenida Rivadavia 3439",
                direction: "El Pobre Luis",
                horario: "08am-22pm",
                tipoRestaurante: "Parrilla",
                telefono: 3232232,
              },
              {
                id: 2,
                name: "Güerrín",
                direction: "Corrientes 1368",
                horario: "9am-23pm",
                tipoRestaurante: "Pizza",
                telefono: 8565446,
              },
              {
                id: 3,
                name: "La Pescadorita",
                direction: "Humboldt 1905",
                horario: "9am-23pm",
                tipoRestaurante: "Mariscos",
                telefono: 798778,
              },
            ]);
          });
      });
    });
})
});
