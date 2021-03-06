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
                    { id: 1, name: "Ezequiel", surname: "Cheron", age : 34, state : true, favorites: [1,2,3]},
                    { id: 2, name: "Javier", surname: "Cheron", age : 33, state : true, favorites: [3,2]},
                    { id: 3, name: "Matias", surname: "Ramirez", age : 64, state : true, favorites: [2]},
                    { id: 4, name: "Adam", surname: "coca", age : 24, state : true, favorites: [2,3]},
                    { id: 5, name: "noname", surname: "nosurname", age : 100, state : false, favorites: []}
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
                  { id: 1, name: "Ezequiel", surname: "Cheron", age : 34, state : true, favorites: [1,2,3]})
            })
        })

        // it("da error con un user que no existe", async () => {

        //     chai.request(index)
        //       .get('/user/6')
        //       .end((_, res) => {
        //         expect(res).to.have.status(404)
        //         expect(res).to.be.json
        //         expect(JSON.parse(res.text))
        //           .to.eql({ message: "User no encontrado" })          
        //       })
        //   })
        })

    describe("POST /user", () => {
        // describe("Cuando el usaurio a crear esta en el mismo nivel que otro", () =>{
        //     it("No es posible agregar ese Restaurant")
        // })

        describe("cuando el usuario no est?? en el nivel de otro", () => {
            it("crea un usuario", () => {
              chai.request(index)
                .post('/user')
                .send({ id: 6, name: "noname new", surname: "nosurname new", age : 65, state : true, favorites: []})
                .end((_, res) => {
                  expect(res).to.have.status(201) // CREATED
                  expect(res).to.be.json
                  expect(JSON.parse(res.text))
                    .to.eql({ id: 6, name: "noname new", surname: "nosurname new", age : 65, state : true, favorites: []})
                })
            })

            it("muestra un usuario reci??n creado", () => {
                chai.request(index)
                  .post('/user')
                  .send({ id: 6, name: "noname new", surname: "nosurname new", age : 65, state : true, favorites: []})
                  .end((_, res) => {
                    expect(res).to.have.status(201) // CREATED
                    expect(res).to.be.json
                    expect(JSON.parse(res.text))
                      .to.eql({ id: 6, name: "noname new", surname: "nosurname new", age : 65, state : true, favorites: []})
                  })
                  
                chai.request(index)
                  .get('/user')
                  .end((_, res) => {
                    // console.log('respuesta 2: ',res.text)
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(JSON.parse(res.text))
                      .to.eql([
                        { id: 1, name: "Ezequiel", surname: "Cheron", age : 34, state : true, favorites: [1,2,3]},
                        { id: 2, name: "Javier", surname: "Cheron", age : 33, state : true, favorites: [3,2]},
                        { id: 3, name: "Matias", surname: "Ramirez", age : 64, state : true, favorites: [2]},
                        { id: 4, name: "Adam", surname: "coca", age : 24, state : true, favorites: [2,3]},
                        { id: 5, name: "noname", surname: "nosurname", age : 100, state : false, favorites: []},
                        { id: 6, name: "noname new", surname: "nosurname new", age : 65, state : true, favorites: []}
                      ])
                    })
                })          
            }) 
      })
    

    describe("DELETE /user", () => {
        it("Borra un restaurant por id de la lista de restaurantes", () => {

          chai.request(index)
          .delete('/user/1')
          .end((_, res) =>{
              expect(res).to.have.status(200)
              expect(res).to.be.json
              expect(JSON.parse(res.text))
              .to.eql(
                { id: 1, name: "Ezequiel", surname: "Cheron", age : 34, state : true, favorites: [1,2,3]})
          })
        })
    }) 

    describe("PUT /user", async () => {
        it("Modifica un restaurant por id de la lista de restaurant", () => {

          chai.request(index)
          .put('/user/6')
          .send({ name: "Chero", surname: "Chero", age : 34, state : true, favorites: [1,2]})
          .end((_, res) =>{
            // console.log('respuesta 22: ',res.text)
              expect(res).to.have.status(200)
              expect(res).to.be.json
              expect(JSON.parse(res.text))
              .to.eql(
                { id: 6, name: "Chero", surname: "Chero", age : 34, state : true, favorites: [1,2]})
          })
      
      })
    })
})