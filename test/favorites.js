const chai = require('chai')
const chaiHttp = require('chai-http')
const { json } = require('express')
const { describe } = require('mocha')
const { expect } = chai

const restaurants = require('../data/Restaurant')
// const users = require('../data/User') --> only the data not the handlers
const users = require('../services/dataHandlerUser') //everything mixed

const app = require('../index')

chai.use(chaiHttp)

describe('API RICO Favorites', ()=>{

    describe('GET /Favorites', ()=>{
        //done [✔]
        it('trae todos los usuarios con sus nombres y favoritos', async () =>{
            chai.request(app)
            .get('/Favorites')
            .end((_,res)=> {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text)).to.eql(users.allUsersFavorites)
                /*
                expect(JSON.parse(res.text)).to.eql([
                    {id: 1, name: 'Ezequiel', favorites: [1]},
                    {id: 2, name: 'Javier', favorites: [1,3]},
                    {id: 3, name: 'Matias', favorites: [1,2]},
                    {id: 4, name: 'Adam', favorites: [2]}
                ])
                */
            })
        })
    })

    describe('GET /Favorites/:id', ()=>{
        //done []
        it('trae json de favoritos del usuario', ()=>{
            chai.request(app)
            .get('/Favorites/1')
            .end((_, res) =>{
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                // .to.eql(users.favoritesByUser(1))
                .to.eql({id: 1, name: 'Ezequiel', favorites: [1]})
            })
        })
        it('trae error si no tiene favoritos el usuario', ()=>{
            chai.request(app)
                    .get('/Favorites/5')
                    .end((_, res) => {
                    expect(res).to.have.status(404)
                    expect(res).to.be.json
                    expect(JSON.parse(res.text))
                        .to.eql({ message: "There are no favorites for this user"})          
                    })
        })
        it('trae error si no existe ese usuaio', ()=>{
            chai.request(app)
            .get('/Favorites/5')
            .end((_, res) => {
            expect(res).to.have.status(404)
            expect(res).to.be.json
            expect(JSON.parse(res.text))
                .to.eql({ message: "There are no users with that id"})          
            })
        })
    })

    describe('POST /Favorites/:id', ()=>{
        describe('agrega a un id de un usuario que existe',()=>{
            describe('agrega en un usuario favoritos', ()=>{
                //done []
                it('agrega favoritos al usuario', ()=>{
                        chai.request(app)
                        .post('/Favorites/1')
                        .send({
                            favorites: [2, 3],
                            add: true
                        })
                        .end((_, res) => {
                            expect(res).to.have.status(201) // CREATED
                            expect(res).to.be.json
                            expect(JSON.parse(res.text))
                            .to.eql({id: 1, name: 'Ezequiel', favorites: [1,2,3]})
                            // .to.eql()
                        })
                })
                //mepa que no tiene mucho sentido este | done[]
                it('agrega un favorito al usuario y lo muestra', () => {
                    chai.request(app)
                    .post('/Favorites/2')
                    .send({
                        favorites: [2, 3],
                            add: true
                    })
                    .end((_, res)=>{
                        expect(res).to.have.status(201)
                        expect(res).to.be.json
                        expect(JSON.parse(res.text))
                        .to.eql({id: 2, name: 'javier', favorites: [1,3,2]})
                    })
                    chai.request(app)
                    .get('/Favorites/2')
                    .end((_,res)=>{
                        expect(res).to.have.status(200)
                        expect(res).to.be.json
                        expect(JSON.parse(res.text))
                        .to.eql({id: 2, name: 'javier', favorites: [1,3,2]})
                    })
                })
                //done []
                it('pisa los favoritos anteriores por los nuevos', ()=>{
                        chai.request(app)
                    .post('/Favorites/1')
                    .send({
                        favorites: [2, 3],
                        add: false
                    })
                    .end((_, res) => {
                        expect(res).to.have.status(201) // CREATED
                        expect(res).to.be.json
                        expect(JSON.parse(res.text))
                        .to.eql({id: 1, name: 'Ezequiel', favorites: [2,3]})
                    })
                })
                //done []
                it('da un error al no encontrar restaurants con las id recibidas',()=>{
                    chai.request(app)
                    .post('/Favorites/1')
                    .send({
                        favorites: [912889, 545011],
                        add: true
                    })
                    .end((_, res) => {
                    expect(res).to.have.status(404)
                    expect(res).to.be.json
                    expect(JSON.parse(res.text))
                        .to.eql({ message: "The id's of the favourites restaurants are not valid" })          
                    })
                })
                
            })
            describe('intenta agregar en usuaio algo que no es favoritos', ()=>{
                //done []
                it('da un error por no recibir favoritos',()=>{
                    chai.request(app)
                    .post('/Favorites/1')
                    .send({
                        nothing: true
                    })
                    .end((_, res) => {
                    expect(res).to.have.status(404)
                    expect(res).to.be.json
                    expect(JSON.parse(res.text))
                        .to.eql({ message: "There were no valid data in the request" })          
                    })
                })
                //done []
                it('da un error al no tener en favoritos validas id',()=>{
                    chai.request(app)
                    .post('/Favorites/1')
                    .send({
                        favorites: ['formula 1', 'nascar'],
                        add: true
                    })
                    .end((_, res) => {
                    expect(res).to.have.status(404)
                    expect(res).to.be.json
                    expect(JSON.parse(res.text))
                        .to.eql({ message: "The id's of the favourites restaurants are not valid" })          
                    })
                })
            })
        })
        describe('agrega a un id de un usuario que no existe',()=>{
            //done []
            it('da un error al no encontrar tal usuario', () => {
                chai.request(app)
                .post('/Favorites/2o3ij52')
                .send({
                    favorites: [2, 4, 5, 8],
                    add: true
                })
                .end((_, res) => {
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                    .to.eql({ message: "The user id is not valid or the user does't exist"})          
                })
            })
        })
    })

    describe('DELETE /Favorites/:id', ()=>{
        describe('elimina de un usuaio que existe', ()=>{
            describe('elimina un favoritos que existe', ()=>{
                it('elimina un favorito del usuaio',()=>{

                })
                it('elimina un favorito del usuaio y muestra los favoritos del usuario',()=>{

                })
                it('elimina todos los favoritos del usuario',()=>{

                })
            })
            describe('intenta eliminar favoritos que no existen', ()=>{
                it('da error por no encontrar el favorito a eliminar', ()=>{})
            })
        })
        describe('elimina de un usuaio que no existe', ()=>{
            //
            it('da error por no encontrar el usuario',()=>{})
        })
    })

})