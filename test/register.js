const { expect } = require("chai")
const { describe } = require("mocha")
const axios = require("axios")
var app = require('../index')

describe("API RICO REGISTER", () => {
    
    describe("GET /restaurant", () => {
        it("Trae todos los restaurant del controlador", async () => {
            // const response = await axios.get('http://localhost:3000/restaurant')

            // expect(response.data).to.eql([{ id: 1, conten: "Restaurant Rosa Negra",
            // Direccion: "Dardor Rocha 1500", Estado : true}, { id: 2, conten: "Restaurant La Bisteca",
            // Direccion: "Dardor Rocha 1000",Estado : true}])
        })
    })

    describe("POST /register crear un nuevo registro", () => {
        it("Crear un nuevo registro  en la lista de registros retornando 200", () => {
                  chai.request(app)
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
                   // .expect(200, done)   
        })
    }) 
})
////
/*obtenemos nuestra api rest que vamos a testear*/
//var app = require('../app/server')