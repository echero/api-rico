const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe } = require('mocha')
const { expect } = chai
const app = require('../index')

chai.use(chaiHttp)

describe('API RICO Menu', ()=>{
    describe('GET /Menu', ()=>{
        //done [✔]
        it('trae todos los menus con sus platos', async ()=>{
            chai.request(app)
            .get('/Menu')
            .end((_,res)=> {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                // console.log('[respuesta 0 ] => ',res.text)//BUG
                expect(JSON.parse(res.text)).to.eql([
                {"id":1,"idRestaurant":1,"plates":[{"id":1,"name":"choriso","price":500},{"id":2,"name":"morcilla","price":800},{"id":3,"name":"tacos de cerdo","price":700},{"id":4,"name":"Costillas BBQ","price":900}]},
                {"id":2,"idRestaurant":2,"plates":[{"id":5,"name":"Pizza Napolitana","price":480},{"id":6,"name":"Pizza de mozzarella","price":700},{"id":7,"name":"Pizza Hawaiana","price":500},{"id":8,"name":"Pizza de Pepperoni","price":300},{"id":9,"name":"Pizza Prosciutto","price":660}]},
                {"id":3,"idRestaurant":3,"plates":[{"id":10,"name":"Ceviche de pescado","price":840},{"id":11,"name":"Paella valenciana","price":1240},{"id":12,"name":"Merluza al vapor con verduras","price":890},{"id":13,"name":"salmon rosado","price":2000}]},
                {"id": 4,"idRestaurant": 1,"plates": []}
                ])
            })
        })
    })
    describe('GET /Menu/:id', ()=>{
        //done [✔]
        it('trae un menu segun id', ()=>{
            chai.request(app)
            .get('/Menu/1')
            .end((_, res) =>{
                // console.log('[respuesta 1 ] => ', res.text)//BUG
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({"id":1,"idRestaurant":1,"plates":[{"id":1,"name":"choriso","price":500},{"id":2,"name":"morcilla","price":800},{"id":3,"name":"tacos de cerdo","price":700},{"id":4,"name":"Costillas BBQ","price":900}]})
            })
        })
        //done [✔]
        it('trae error si no encuentra ese menu', ()=>{
            chai.request(app)
            .get('/Menu/9988989')
            .end((_, res) =>{
                // console.log('[respuesta 2 ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({message : 'there are no menus with that id'})
            })
        })
        //done [✔]
        it('trae los platos de un menu segun id', ()=>{
            chai.request(app)
            .get('/Menu/1/plates')
            .end((_, res) =>{
                // console.log('[respuesta 3 ] => ', res.text)//BUG
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql([
                    {"id":1,"name":"choriso","price":500},
                    {"id":2,"name":"morcilla","price":800},
                    {"id":3,"name":"tacos de cerdo","price":700},
                    {"id":4,"name":"Costillas BBQ","price":900}
                ])
            })
        })
        //done [✔]
        it('trae error si no tiene platos en el menu', ()=>{
            chai.request(app)
            .get('/Menu/4/plates')
            .end((_, res) =>{
                // console.log('[respuesta 4 ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({message : "there are no plates in this menu"})
            })
        })
        //:id
        //done [✔]
        it('trae el plato segun el id del menu y del plato', ()=>{
            chai.request(app)
            .get('/Menu/1/plate/1')
            .end((_, res) =>{
                // console.log('[respuesta 5 ] => ', res.text)//BUG
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({"id":1,"name":"choriso","price":500})
            })
        })
        //done [✔]
        it('trae error si no encuentra ese menu (al buscar un plato)', ()=>{
            chai.request(app)
            .get('/Menu/9988989/plate/1')
            .end((_, res) =>{
                // console.log('[respuesta 6 ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({message : 'there are no menus with that id'})
            })
        })
        //done [✔]
        it('trae error si no encuentra el plato', ()=>{
            chai.request(app)
            .get('/Menu/1/plate/9899')
            .end((_, res) =>{
                // console.log('[respuesta 7 ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({message : 'there are no plates with that id'})
            })
        })
    })
    describe('POST /Menu/:id', ()=>{
        //done [✔]
        it('agrega el menu', ()=>{
            chai.request(app)
            .post('/Menu')
            .send(
                {"id":5,"idRestaurant":1,"plates":[
                    {"id":1,"name":"chori-pan","price":200},
                    {"id":2,"name":"morci-pan","price":500},
                    {"id":3,"name":"nachos con cheddar","price":160},
                    {"id":4,"name":"salchicha parrillera","price":600}]
                })
            .end((_, res) =>{
                // console.log('[respuesta 8 ] => ', res.text)//BUG
                expect(res).to.have.status(201)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({message : 'menu added'})
            })

            chai.request(app)
            .get('/Menu/5')
            .end((_, res) =>{
                // console.log('[respuesta 8 B ] => ', res.text)//BUG
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({"id":5,"idRestaurant":1,"plates":[
                    {"id":1,"name":"chori-pan","price":200},
                    {"id":2,"name":"morci-pan","price":500},
                    {"id":3,"name":"nachos con cheddar","price":160},
                    {"id":4,"name":"salchicha parrillera","price":600}]})
            })

        })
        //done [✔]
        it('trae error si el id del menu no es valida', ()=>{
            chai.request(app)
            .post('/Menu')
            .send(
                {"id":3,"idRestaurant":1,"plates":[
                    {"id":1,"name":"chori-pan","price":200},
                    {"id":2,"name":"morci-pan","price":500},
                    {"id":3,"name":"nachos con cheddar","price":160},
                    {"id":4,"name":"salchicha parrillera","price":600}]
                })
            .end((_, res) =>{
                // console.log('[respuesta 9 ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({message : 'there are already menus with that id'})
            })
        })
        //done [✔]
        it('trae error si el id del restaurant no es valida', ()=>{
            chai.request(app)
            .post('/Menu')
            .send(
                {"id":6,"idRestaurant":7,"plates":[
                    {"id":1,"name":"chori-pan","price":200},
                    {"id":2,"name":"morci-pan","price":500},
                    {"id":3,"name":"nachos con cheddar","price":160},
                    {"id":4,"name":"salchicha parrillera","price":600}]
                })
            .end((_, res) =>{
                // console.log('[respuesta 10 ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({message : 'there are no restaurants with that id'})
            })
        })
        //done [✔]
        it('trae error si los datos del menu nuevo no están bien', ()=>{
            chai.request(app)
            .post('/Menu')
            .send(
                {"id":7,"idRestaurant":1,"plates":[
                    {"id":1,"price":200},
                    {"id":2,"price":500},
                    {"id":3,"name":"nachos con cheddar"},
                    {"id":4,"name":"salchicha parrillera","price":600}]
                })
            .end((_, res) =>{
                // console.log('[respuesta 11 ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({message : 'the menu data provided is not valid'})
            })
        })

        //crea plato
        //done [✔]
        it('agrega el plato al menu', ()=>{
            chai.request(app)
            .post('/Menu/1/plate')
            .send({"id":9,"name":"fugazzetta","price":900})
            .end((_, res) =>{
                // console.log('[respuesta 12 ] => ', res.text)//BUG
                expect(res).to.have.status(201)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql('plate added to the menu 1')
            })
        })
        //done [✔]
        it('trae error si no encuentra el menu del plato a agregar', ()=>{
            chai.request(app)
            .post('/Menu/88/plate')
            .send({"id":9,"name":"fugazzetta","price":900})
            .end((_, res) =>{
                // console.log('[respuesta 13 ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({ message: 'there are no menus with that id'})
            })
        })
        //done [✔]
        it('trae error si los datos del plato nuevo no está bien', ()=>{
            chai.request(app)
            .post('/Menu/1/plate')
            .send({"id":9,"price":900})
            .end((_, res) =>{
                // console.log('[respuesta 14 ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({message : 'the plate data provided is not valid'})
            })
        })
    })
    
    describe('DELETE /Menu/:id', ()=>{
        //done [✔]
        it('elimina el menu', async ()=>{
            chai.request(app)
            .delete('/Menu/1')
            .end((_, res) =>{
                // console.log('[respuesta 23 ] => ', res.text)//BUG
                expect(res).to.have.status(201)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql('menu 1 deleted')
            })
            chai.request(app)
            .get('/Menu/1')
            .end((_, res) =>{
                // console.log('[respuesta 23 B ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({message :"there are no menus with that id"})
            })
        })
        //done [✔]
        it('trae error si el id del menu no es valida', ()=>{
            chai.request(app)
            .delete('/Menu/5675')
            .end((_, res) =>{
                // console.log('[respuesta 24 ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({ message :'there are no menus with that id'})
            })
        })
        //done [✔]
        it('elimina el plato del menu', async ()=>{
            chai.request(app)
            .delete('/Menu/2/plate/5')
            .end((_, res) =>{
                // console.log('[respuesta 25 ] => ', res.text)//BUG
                expect(res).to.have.status(201)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql('plate 5 deleted from the menu 2')
            })
            chai.request(app)
            .get('/Menu/2/plate/5')
            .end((_, res) =>{
                // console.log('[respuesta 25 B ] => ', res.text)//BUG
                expect(res).to.have.status(404)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql({message :"there are no plates with that id"})
            })
        })
        //'elimina todos los platos del menu'
        //'trae error si no encuentra el menu del plato a eliminar'
        //'trae error si no encuentra el plato a eliminar'
    })
})


/*
describe('PUT /Menu/:id', ()=>{
    //'modifica el menu'
    //'trae error si el id del menu no es valida'
    //'trae error is el id del restaurant no es valida'
    //'trae error si los datos del menu modificado no está bien'
    
    //'modifica el plato del menu'
    //'trae error si los datos del plato modificado no está bien'
    //'trae error si no encuentra el menu del plato a modificar'
    //'trae error si no encuentra el plato a modificar'
})*/