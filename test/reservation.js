const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe } = require('mocha')
// const axios = require('axios')
const index = require('../index')
// import app from '../app'
const { expect } = chai

chai.use(chaiHttp)

describe("API RICO", () => {
    
    describe("GET /reservation", () => {
        it("Trae todas las reservas del controlador", async () => {
            // const response = await axios.get('http://localhost:3000/user')

            chai.request(index)
            .get('/reservation')
            .end((_, res) =>{
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql([
                    {id: 1, idUser: 1, idRestaurante: 1, dia: 20, hora: 18},
                    {id: 2, idUser: 2, idRestaurante: 2, dia: 25, hora: 19},
                    {id: 3, idUser: 3, idRestaurante: 3, dia: 30, hora: 21},
                    {id: 4, idUser: 4, idRestaurante: 1, dia: 30, hora: 20}
                ])
            })
        })
    })


    describe("GET /reservation/:id_restaurant", () => {
        it("Trae las reservas de un restaurant especifico", async () => {
            // const response = await axios.get('http://localhost:3000/user/1')

            chai.request(index)
            .get('/reservation/1')
            .end((_, res) =>{
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql([{id: 1, idUser: 1, idRestaurante: 1, dia: 20, hora: 18},
                    {id: 4, idUser: 4, idRestaurante: 1, dia: 30, hora: 20}])
            })
        })

    //     // it("da error con una reserva que no existe ese id", async () => {

    //     //     chai.request(index)
    //     //       .get('/reservation/6')
    //     //       .end((_, res) => {
    //     //         expect(res).to.have.status(404)
    //     //         expect(res).to.be.json
    //     //         expect(JSON.parse(res.text))
    //     //           .to.eql({ message: "User no encontrado" })          
    //     //       })
    //     //   })
        })

    describe("POST /user", () => {

        describe("crear una nueva reserva", () => {
            it("crea una reserva", () => {
              chai.request(index)
                .post('/reservation')
                .send({id: 5, idUser: 5, idRestaurante: 1, dia: 26, hora: 22})
                .end((_, res) => {
                  expect(res).to.have.status(200) // CREATED
                  expect(res).to.be.json
                  expect(JSON.parse(res.text))
                    .to.eql({id: 5, idUser: 5, idRestaurante: 1, dia: 26, hora: 22})
                })

                chai.request(index)
                  .get('/reservation')
                  .end((_, res) => {
                    // console.log('respuesta 2: ',res.text)
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(JSON.parse(res.text))
                      .to.eql([
                        {id: 1, idUser: 1, idRestaurante: 1, dia: 20, hora: 18},
                        {id: 2, idUser: 2, idRestaurante: 2, dia: 25, hora: 19},
                        {id: 3, idUser: 3, idRestaurante: 3, dia: 30, hora: 21},
                        {id: 4, idUser: 4, idRestaurante: 1, dia: 30, hora: 20},
                        {id: 5, idUser: 5, idRestaurante: 1, dia: 26, hora: 22}
                      ])
                    })
                })          
            }) 
      })
    

    describe("DELETE /reservation", () => {
        it("Borra una reserva por id de la lista de reservas, siempre y cuando no sea del mismo dia", () => {

          chai.request(index)
          .delete('/reservation/1')
          .end((_, res) =>{
              expect(res).to.have.status(200)
              expect(res).to.be.json
              expect(JSON.parse(res.text))
              .to.eql(
                {id: 1, idUser: 1, idRestaurante: 1, dia: 20, hora: 18},)
          })
        })

        it("Tira error cuando se quiere eliminar una reserva que es del mismo dia", () => {

            chai.request(index)
            .delete('/reservation/5')
            .end((_, res) =>{
                expect(res).to.have.status(400)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({ message: "No puedes cancelar el mismo día de la reserva" }) 
            })
          })
    }) 

    describe("PUT /reservation", async () => {
        it("Modifica la hora y la fecha de una reserva por id de la lista de reservas", () => {

          chai.request(index)
          .put('/reservation/5')
          .send({dia: 20, hora: 18})
          .end((_, res) =>{
            // console.log('respuesta 22: ',res.text)
              expect(res).to.have.status(200)
              expect(res).to.be.json
              expect(JSON.parse(res.text))
              .to.eql(
                {id: 5, idUser: 5, idRestaurante: 1, dia: 20, hora: 18})
          })
      
      })

      it("No puede modificar la reserva dado que tiene un parametro mas al de dia y hora", () => {

        chai.request(index)
        .put('/reservation/5')
        .send({idRestaurante: 2,dia: 20, hora: 18})
        .end((_, res) =>{
          // console.log('respuesta 22: ',res.text)
            expect(res).to.have.status(404)
            expect(res).to.be.json
            expect(JSON.parse(res.text))
            .to.eql(
                {message: "No se puedo actualizar el dia y la hora de la reserva por tener otro parametro a modificar"})
        })
    
    })
    })
})