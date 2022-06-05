const { expect } = require("chai")
const { describe } = require("mocha")
const axios = require("axios")
var app = require('../index')

describe("API RICO SEARCH", () => {
    
    describe("GET /search", () => {
        it("Trae todos los restaurant que consiga que contiene la palabra que recibo por query string", async () => {
            // const response = await axios.get('http://localhost:3000/restaurant')
            // expect(response.data).to.eql([{ id: 1, conten: "Restaurant Rosa Negra",
            // Direccion: "Dardor Rocha 1500", Estado : true}, { id: 2, conten: "Restaurant La Bisteca",
            // Direccion: "Dardor Rocha 1000",Estado : true}])
            /**
             * chai.request(app)
                  .post('/register')
                    //.post('/api/register/')
                   // .set('Accept', 'application/json')
                    //.expect('Content-Type', /json/)
                    .send({
                      "id": "1150",
                      "conten": "Test",
                      "direccion": "probando test",
                      "estado": true
                    })
                    .end((_, res) => {
                        expect(res).to.have.status(201) //CREATED
                        expect(res).to.be.json
                        expect(JSON.parse(res.text))
                        .to.eql({})
                    })
             */
        })
    })
/*obtenemos nuestra api rest que vamos a testear*/
//var app = require('../app/server')
const { expect } = require("chai")
const { describe } = require("mocha")
const axios = require("axios")
