const { expect } = require("chai")
const ricoProyect = require("../index")

describe('rico-proyect', () => {
    describe('#get', () =>{
        it('llamada a la web de google exitosamente', async () => {

            const response = await ricoProyect.get()

            expect(response.status).to.equal(200)
        })

        it('devuelve un texto de estado', () => {
            ricoProyect.get().then(response => {
                expect(response.statusText).to.equal('OK')
            })
        })
    })
})