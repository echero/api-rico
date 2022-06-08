const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe } = require('mocha')
// const axios = require('axios')
const index = require('../index')
// import app from '../app'
const { expect } = chai

chai.use(chaiHttp)

describe("API RICO", () => {
    
    describe("GET /user", () => {
        it("Trae todos los users del controlador", async () => {
            // const response = await axios.get('http://localhost:3000/user')

            chai.request(index)
            .get('/user')
            .end((_, res) =>{
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql([
                    { id: 1, Nombre: "Ezequiel", Apellido: "Cherone", Edad : 34, Estado : true},
                    { id: 2, Nombre: "Javier", Apellido: "Cherone", Edad : 39, Estado : true }
                ])
            })
        })
    })


    describe("GET /user/:id", () => {
        it("Trae un user especifico", async () => {
            // const response = await axios.get('http://localhost:3000/user/1')

            chai.request(index)
            .get('/user/1')
            .end((_, res) =>{
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql(
                    { id: 1, Nombre: "Ezequiel", Apellido: "Cherone", Edad : 34, Estado : true})
            })
        })

        it("da error con un user que no existe", async () => {

            chai.request(index)
              .get('/user/3')
              .end((_, res) => {
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                  .to.eql({ message: "User no encontrado" })          
              })
          })
        })

    describe("POST /user", () => {
        describe("Cuando el Restaurant ha crear esta en el mismo nivel que otro", () =>{
            it("No es posible agregar ese Restaurant")
        })
        it("Crea un restaurant en la lista de restaurant", () => {
            
        })
    })

    describe("DELETE /user", () => {
        it("Borra un restaurant de la lista de restaurantes", () => {

        })
    }) 

    describe("PUT /user", () => {
        it("Modifica un restaurant de la lista de restaurant", () => {

        })
    })
})