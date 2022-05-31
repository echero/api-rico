const chai = require("chai")
const { describe } = require("mocha")
const chaiHttp = require('chai-http')
const app = require('../app')
const { expect } = require("chai")

chai.use(chaiHttp)

describe("API RICO", () => {
    
    describe("GET /restaurant", () => {
        it("Trae todos los restaurant del controlador", async () => {
            // const response = await axios.get('http://localhost:3000/user')

            chai.request(app).get('/user').end((_, res) =>{
                expect(res).to.have.status(200)
                expect(response.data).to.eql([{ id: 1, conten: "Restaurant Rosa Negra",
                Direccion: "Dardor Rocha 1500", Estado : true}, { id: 2, conten: "Restaurant La Bisteca",
                Direccion: "Dardor Rocha 1000",Estado : true}])
            })
        })
    })


    describe("GET /restaurant/:id", () => {
        it("Trae un restaurant especifico", async () => {
            const response = await axios.get('http://localhost:3000/user/1')

            expect(response.data).to.eql({ id: 1, conten: "Restaurant Rosa Negra",
            Direccion: "Dardor Rocha 1500", Estado : true})
        })
    })

    describe("POST /restaurant", () => {
        describe("Cuando el Restaurant ha crear esta en el mismo nivel que otro", () =>{
            it("No es posible agregar ese Restaurant")
        })
        it("Crea un restaurant en la lista de restaurant", () => {
            
        })
    })

    describe("DELETE / restaurant", () => {
        it("Borra un restaurant de la lista de restaurantes", () => {

        })
    }) 

    describe("PUT /restaurant", () => {
        it("Modifica un restaurant de la lista de restaurant", () => {

        })
    })
})