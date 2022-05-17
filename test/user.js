const { expect } = require("chai")
const Usuarios = require("../index")

describe('Usuarios', () => {
    describe('#get', () =>{
        it('llamada al servicio user', async () => {

            const response = await Usuarios.get("http://127.0.0.1:3000/user")

            expect(response.status).to.equal(200)
        })

        it('devuelve un texto', () => {
            Usuarios.get().then(response => {
                expect(response.statusText).to.equal('OK')
            })
        })
    })
})