const  chai  = require("chai")
const chaiHttp = require('chai-http')
const { describe } = require("mocha")
const axios = require("axios")
const app = require('../index')
const { expect} = chai
chai.use(chaiHttp)
const request = require('supertest')

describe("API RICO SEARCH", () => {
    
    describe("GET /search", () => {
        it("Trae todos los restaurant que consiga que contiene la palabra que recibo por query string", () => {
           
            request(app)
            .get('/search')
            //.set('Accept', 'application/json')
            //.expect('Content-Type', /json/)
            
            //.expect(200)

            // const response = await axios.get('http://localhost:3000/search')

            // chai.request(response)
            // .get('/search')
            // .end((_, res) =>{
            //    expect(res).to.have.status(200)

            // chai.request(app)
            // .get('/search?q=q')
            // .end((_, res) =>{
            //    expect(res).to.have.status(200)
        }) 
        //expect(res.data)
        //.to.eql([{name: "La"}])


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
        // it("Trae todos los datos de un restaurante", async () => {
        //     chai.request(app)
        //     .get("/search")
        //     .end((_, res) => {
        //         expect(res).to.have.status(200)
        //         expect(res).to.be.json
        //         expect(JSON.parse(res.text))
        //         .to.eql({name: 'EL NOMBRE DEL PARAMETRO'})
        //     })
        // })
      //  it("No consiguio ningun restaurante por la palabra enviada por query string", async () => {})
    })
//})