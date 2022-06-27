const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe } = require('mocha')
const { expect } = chai
const app = require('../index')
//done [✔]
chai.use(chaiHttp)

describe('API RICO Reviews', ()=>{

    describe('GET /review', ()=>{
        //done [✔]
        it('trae todas las reviews', async () => {
            chai.request(app)
            .get('/review')
            .end((_,res)=> {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                console.log('[respuesta 0 ] => ',res.text)//BUG
                expect(JSON.parse(res.text)).to.eql([
                    {id: 1, idUser: 1, idRestaurant: 2, score: 4, comment:"Muy rico"},
                    {id: 2, idUser: 2, idRestaurant: 2, score: 1, comment:"Esperaba algo mejor"},
                    {id: 3, idUser: 3, idRestaurant: 3, score: 3, comment:"Estuvo bien pero no volveria"},
                    {id: 4, idUser: 3, idRestaurant: 3, score: 3, comment: "podria ser mejor"},
                    {id: 5, idUser: 4, idRestaurant: 2, score: 5, comment: "genial!!"},
                    {id: 6, idUser: 1, idRestaurant: 1, score: 5, comment: "increible!"},
                    {id: 7, idUser: 2, idRestaurant: 1, score: 2, comment: "horrible!"}
                ])
            })
        })
    })

    describe('GET /review/:id', ()=>{
        //done
        it('trae una review segun id', () => {
            chai.request(app)
            .get('/review/1')
            .end((_, res) =>{
                console.log('[respuesta 1 ] => ', res.text)//BUG
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({id: 1, idUser: 1, idRestaurant: 2, score: 4, comment:"Muy rico"})
            })
        })
        //done
        it('trae error si no tiene una review con ese id', () => {
            chai.request(app)
            .get('/review/9000')
            .end((_, res) => {
                console.log('[respuesta 2 ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({ message: "There are no reviews with that id"})          
            })
        })
    })
//
    describe('GET /user/:id/reviews', ()=>{
        //done
        it('trae todas las review de un usuario segun id', () => {
            chai.request(app)
            .get('/user/1/reviews')
            .end((_, res) =>{
                console.log('[respuesta 3 ] => ', res.text)//BUG
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql([
                    {id: 1, idUser: 1, idRestaurant: 2, score: 4, comment:"Muy rico"},
                    {id: 6, idUser: 1, idRestaurant: 1, score: 5, comment: "increible!"}
                ])
            })
        })
        //done
        it('trae error por no encontrar reviews de ese usuario', () => {
            chai.request(app)
            .get('/user/5/reviews')
            .end((_, res) =>{
                console.log('[respuesta 3.2 ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({message: "There are no reviews by this user"})
            })
        })
    })
    describe('GET /restaurant/:id/reviews', ()=>{
        //done
        it.only('trae todas las review de un restaurant segun id', () => {
            chai.request(app)
            .get('/restaurant/1/reviews')
            .end((_, res) =>{
                console.log('[respuesta 4 ] => ', res.text)//BUG
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql([
                    {id: 6, idUser: 1, idRestaurant: 1, score: 5, comment: "increible!"},
                    {id: 7, idUser: 2, idRestaurant: 1, score: 2, comment: "horrible!"}
                ])
            })
        })
        // not done
        it.only('trae error por no encontrar reviews para este restarant', async () => {
            chai.request(app)
            .get('/restaurant/4/reviews')
            .end((_, res) =>{
                console.log('[respuesta 4.2 ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({message: "There are no reviews for this restaurant"})
            })
        })
    })
//
    describe('POST /review', ()=>{
        //done
        it('crea una review con datos validos', async () => {
            chai.request(app)
            .post('/review')
            .send({
            idUser: 2, idRestaurant: 3, score: 4, comment:"recomendable"
            })
            .end((_, res) => {
                console.log('[respuesta 5 ] => ', res.text)//BUG
                expect(res).to.have.status(201) // CREATED
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({ message: 'review added succesfully'})
            })

            //added
            chai.request(app)
            .get('/review')
            .end((_,res) => {
                console.log('[respuesta 5 B ] => ', res.text)//BUG
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text)).to.eql([
                    {id: 1, idUser: 1, idRestaurant: 2, score: 4, comment:"Muy rico"},
                    {id: 2, idUser: 2, idRestaurant: 2, score: 1, comment:"Esperaba algo mejor"},
                    {id: 3, idUser: 3, idRestaurant: 3, score: 3, comment:"Estuvo bien pero no volveria"},
                    {id: 4, idUser: 3, idRestaurant: 3, score: 3, comment: "podria ser mejor"},
                    {id: 5, idUser: 4, idRestaurant: 2, score: 5, comment: "genial!!"},
                    {id: 6, idUser: 1, idRestaurant: 1, score: 5, comment: "increible!"},
                    {id: 7, idUser: 2, idRestaurant: 1, score: 2, comment: "horrible!"},
                    {id: 8, idUser: 2, idRestaurant: 3, score: 4, comment:"recomendable"}
                ])
            })
        })
        //done
        it('da error por datos invalidos', () => {
            chai.request(app)
            .post('/review')
            .send({
            idUser: 22222, idRestaurant: 4444444, score: 10, comment:"recomendable"
            })
            .end((_, res) => {
                console.log('[respuesta 5 ] => ', res.text)//BUG
                expect(res).to.have.status(404) // CREATED
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({ message: 'error - data provided was not valid'})
            })
        })

    })

    describe('DELETE /review/:id', ()=>{
        //done
        it('elimina review por id', ()=>{
            chai.request(app)
            .delete('/review/1')
            .end((_, res) =>{
                console.log('[respuesta 6 ] => ', res.text)//BUG
                expect(res).to.have.status(201)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql('review 1 deleted')
            })
        })
        it('intenta mostrar el review eliminado', () => {
            chai.request(app)
            .get('/review/1')
            .end((_, res) => {
                console.log('[respuesta 6 B ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({ message: "There are no reviews with that id"})          
            })
        })
        //done
        it('da error por no encontrar tal review', () => {
            chai.request(app)
            .delete('/review/6588')
            .end((_, res) =>{
                console.log('[respuesta 7 ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({ message: "There are no reviews with that id"})
            })  
        })
    })

})