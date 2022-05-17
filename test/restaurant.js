const { expect } = require("chai")
const Restaurant = require("../index")

describe('Restaurant', () => {
    describe('#get', () =>{
        it('llamada al servicio restaurant', async () => {

            const response = await Restaurant.get("http://127.0.0.1:3000/restaurant")

            expect(response.status).to.equal(200)
        })

        it('devuelve un texto', () => {
            Restaurant.get().then(response => {
                expect(response.statusText).to.equal('OK')
            })
        })
    })
})