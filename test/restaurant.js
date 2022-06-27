const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe } = require('mocha')
// const axios = require('axios')
const index = require('../index')
// import app from '../app'
const { expect } = chai

chai.use(chaiHttp)

describe("API RICO", () => {
    
    describe("GET /restaurant", () => {
        it("Trae todos los restaurant del data/Restaurant", async () => {
            // const response = await axios.get('http://localhost:3000/user')

            chai.request(index)
            .get('/restaurant')
            .end((_, res) =>{
                console.log(res.text)
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql([
                    { id: 1, name: "Avenida Rivadavia 3439", direction: "El Pobre Luis", horario: "08am-22pm", tipoRestaurante: "Parrilla", telefono: 3232232 },
                    { id: 2, name: "Güerrín", direction: "Corrientes 1368", horario: "9am-23pm", tipoRestaurante: "Pizza", telefono: 8565446 },
                    { id: 3, name: "La Pescadorita", direction: "Humboldt 1905", horario: "9am-23pm", tipoRestaurante: "Mariscos", telefono: 798778 },
                    { id: 4, name :"Paleta", direction :"Belgrano 1800", horario :"11am-1am", tipoRestaurante :"parrilla", telefono :448778}
                ])
            })
        })
    })


    describe("GET /restaurant/:id", () => {
        it("Trae un user especifico", async () => {
            // const response = await axios.get('http://localhost:3000/user/1')

            chai.request(index)
            .get('/restaurant/1')
            .end((_, res) =>{
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql(
                    { id: 1, name: "Avenida Rivadavia 3439", direction: "El Pobre Luis", horario: "08am-22pm", tipoRestaurante: "Parrilla", telefono: 3232232 })
            })
        })

        // it("da error con un restaurant que no existe", async () => {

        //     chai.request(index)
        //       .get('/restaurant/16')
        //       .end((_, res) => {
        //         expect(res).to.have.status(404)
        //         expect(res).to.be.json
        //         expect(JSON.parse(res.text))
        //           .to.eql({ message: "Restaurant no encontrado" })          
        //       })
        //   })
        })

        describe("POST /restaurant", () => {
            describe("cuando el rastaurant nuevo está en el nivel de otro", () => {
              it("no es posible aceptar ese restaurant", () => {})     
            })
        
            describe("cuando el restaurant no está en el nivel de otro", () => {
              it("crea un restaurant", () => {
                chai.request(index)
                  .post('/restaurant')
                  .send({ id: 5, name: "Nuevo Restaurant La Vaca", direction: "Av. Carabobo 1000", horario: "9am-23pm", tipoRestaurante: "Parrilla", telefono: 47890987 })
                  .end((_, res) => {
                    // console.log('crea test',res.text)
                    expect(res).to.have.status(201) // CREATED
                    expect(res).to.be.json
                    expect(JSON.parse(res.text))
                      .to.eql({ id: 5, name: "Nuevo Restaurant La Vaca", direction: "Av. Carabobo 1000", horario: "9am-23pm", tipoRestaurante: "Parrilla", telefono: 47890987 })
                  })
              })
              
              it("muestra un restaurant recién creado", () => {
                chai.request(index)
                  .post('/restaurant')
                  .send({id: 6, name: "Nuevo Restaurant", direction: "Av. Carabobo 2000", horario: "9am-23pm", tipoRestaurante: "Teco", telefono: 47988090 })
                  .end((_, res) => {
                    expect(res).to.have.status(201) // CREATED
                    expect(res).to.be.json
                    expect(JSON.parse(res.text))
                      .to.eql({id: 6, name: "Nuevo Restaurant", direction: "Av. Carabobo 2000", horario: "9am-23pm", tipoRestaurante: "Teco", telefono: 47988090 })
                  })

                  chai.request(index)
                    .get('/restaurant')
                    .end((_, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(JSON.parse(res.text))
                      .to.eql([
                        { id: 1, name: "Avenida Rivadavia 3439", direction: "El Pobre Luis", horario: "08am-22pm", tipoRestaurante: "Parrilla", telefono: 3232232 },
                        { id: 2, name: "Güerrín", direction: "Corrientes 1368", horario: "9am-23pm", tipoRestaurante: "Pizza", telefono: 8565446 },
                        { id: 3, name: "La Pescadorita", direction: "Humboldt 1905", horario: "9am-23pm", tipoRestaurante: "Mariscos", telefono: 798778 },
                        { id: 4, name :"Paleta", direction :"Belgrano 1800", horario :"11am-1am", tipoRestaurante :"parrilla", telefono :448778},
                        { id: 5, name: "Nuevo Restaurant La Vaca", direction: "Av. Carabobo 1000", horario: "9am-23pm", tipoRestaurante: "Parrilla", telefono: 47890987 },
                        { id: 6, name: "Nuevo Restaurant", direction: "Av. Carabobo 2000", horario: "9am-23pm", tipoRestaurante: "Teco", telefono: 47988090 }
                      ])
                  })
                  })
                })          
              })
          
        

    describe("DELETE / restaurant", () => {
        it("Borra un restaurant por id de la lista de restaurants", () => {

          chai.request(index)
          .delete('/restaurant/1')
          .end((_, res) =>{
              expect(res).to.have.status(200)
              expect(res).to.be.json
              expect(JSON.parse(res.text))
              .to.eql(
                { id: 1, name: "Avenida Rivadavia 3439", direction: "El Pobre Luis", horario: "08am-22pm", tipoRestaurante: "Parrilla", telefono: 3232232})
          })
        })
    }) 

    describe("PUT /restaurant", async () => {
        it("Modifica un restaurant por id de la lista de restaurant", () => {

          chai.request(index)
          .put('/restaurant/6')
        .send({ name: "Modificado", direction: "Av. Carabobo 2000", horario: "9am-23pm", tipoRestaurante: "Teco", telefono: 1539227719})
          .end((_, res) =>{
              expect(res).to.have.status(200)
              expect(res).to.be.json
              expect(JSON.parse(res.text))
              .to.eql({
                id: 6, name: "Modificado", direction: "Av. Carabobo 2000", horario: "9am-23pm", tipoRestaurante: "Teco", telefono: 1539227719})
          })
        })
    })
})