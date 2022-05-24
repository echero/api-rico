const { expect } = require("chai")
const { describe } = require("mocha")
const axios = require("axios")

describe("API RICO", () => {
    
    describe("GET /restaurant", () => {
        it("Trae todos los restaurant del controlador", async () => {
            const response = await axios.get('http://localhost:3000/restaurant')

            expect(response.data).to.eql([{ id: 1, conten: "Restaurant Rosa Negra",
            Direccion: "Dardor Rocha 1500", Estado : true}, { id: 2, conten: "Restaurant La Bisteca",
            Direccion: "Dardor Rocha 1000",Estado : true}])
        })
    })


    describe("GET /restaurant/:id", () => {
        it("Trae un restaurant especifico", async () => {
            const response = await axios.get('http://localhost:3000/restaurant/1')

            expect(response.data).to.eql({ id: 1, conten: "Restaurant Rosa Negra",
            Direccion: "Dardor Rocha 1500", Estado : true})
        })
    })

    describe("POST /restaurant", () => {
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