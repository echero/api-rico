const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe } = require('mocha')
const { expect } = chai
const app = require('../index')

chai.use(chaiHttp)

// describe('API RICO Favorites', ()=>{

//     describe('GET /favorites', ()=>{
//         //done [✔]
//         it('trae todos los usuarios con sus nombres y favoritos', async () =>{
//             chai.request(app)
//             .get('/favorites')
//             .end((_,res)=> {
//                 expect(res).to.have.status(200)
//                 expect(res).to.be.json
//                 expect(JSON.parse(res.text)).to.eql([
//                     {id: 1, name: 'Ezequiel', favorites: [1]},
//                     {id: 2, name: 'Javier', favorites: [1,3]},
//                     {id: 3, name: 'Matias', favorites: [1,2]},
//                     {id: 4, name: 'Adam', favorites: [2,3]}
//                 ])
//             })
//         })
//     })

//     describe('GET /favorites/:id', ()=>{
//         //done [✔]
//         it('trae favoritos del usuario', ()=>{
//             chai.request(app)
//             .get('/favorites/1')
//             .end((_, res) =>{
//                 expect(res).to.have.status(200)
//                 expect(res).to.be.json
//                 expect(JSON.parse(res.text))
//                 // .to.eql(users.favoritesByUser(1))
//                 .to.eql({id: 1, name: 'Ezequiel', favorites: [1]})
//             })
//         })
//         //done []
//         it('trae error si no tiene favoritos el usuario', ()=>{
//             chai.request(app)
//                     .get('/favorites/5')
//                     .end((_, res) => {
//                     expect(res).to.have.status(404)
//                     expect(res).to.be.json
//                     expect(JSON.parse(res.text))
//                         .to.eql({ message: "There are no favorites for this user"})          
//                     })
//         })
//         //done []
//         it('trae error si no existe ese usuario', ()=>{
//             chai.request(app)
//             .get('/favorites/5')
//             .end((_, res) => {
//             expect(res).to.have.status(404)
//             expect(res).to.be.json
//             expect(JSON.parse(res.text))
//                 .to.eql({ message: "There are no users with that id"})          
//             })
//         })
//         //done []
//         it('trae error si lo pasado como id no es valido', ()=>{
//             chai.request(app)
//             .get('/favorites/j23oij2')
//             .end((_, res) => {
//             expect(res).to.have.status(404)
//             expect(res).to.be.json
//             expect(JSON.parse(res.text))
//                 .to.eql({ message: 'The id passed is not valid'})        
//             })
//         })
//     })

//     describe('POST /favorites/:id', ()=>{
//         describe('agrega a un id de un usuario que existe',()=>{
//             describe('agrega en un usuario favoritos', ()=>{
//                 //done []
//                 it('agrega favoritos al usuario', ()=>{
//                         chai.request(app)
//                         .post('/favorites/1')
//                         .send({
//                             favorites: [2, 3]
//                         })
//                         .end((_, res) => {
//                             expect(res).to.have.status(201) // CREATED
//                             expect(res).to.be.json
//                             expect(JSON.parse(res.text))
//                             // .to.eql({id: 1, name: 'Ezequiel', favorites: [1,2,3]})
//                             .to.eql({ message: 'Favorites list updated'})
//                         })
//                 })
//                 //mepa que no tiene mucho sentido este | done[]
//                 it('agrega un favorito al usuario y lo muestra', async () => {
//                     chai.request(app)
//                     .post('/favorites/2')
//                     .send({
//                         favorites: [2, 3]
//                     })
//                     .end((_, res)=>{
//                         expect(res).to.have.status(201)
//                         expect(res).to.be.json
//                         expect(JSON.parse(res.text))
//                         // .to.eql({id: 2, name: 'javier', favorites: [1,3,2]})
//                         .to.eql({ message: 'Favorites list updated'})
//                     })
//                     chai.request(app)
//                     .get('/favorites/2')
//                     .end((_,res)=>{
//                         expect(res).to.have.status(200)
//                         expect(res).to.be.json
//                         expect(JSON.parse(res.text))
//                         .to.eql({id: 2, name: 'javier', favorites: [1,3,2]})
//                     })
//                 })
//                 //done []
//                 it('da un error al no encontrar restaurants con las id recibidas', ()=>{
//                     chai.request(app)
//                     .post('/favorites/1')
//                     .send({
//                         favorites: [912889, 545011]
//                     })
//                     .end((_, res) => {
//                     expect(res).to.have.status(404)
//                     expect(res).to.be.json
//                     expect(JSON.parse(res.text))
//                         .to.eql({ message: "the restaurants weren't found, some or all of the id's provided may not be from restaurants in the database"})
//                     })
//                 })
                
//             })
//             describe('intenta agregar en usuario algo que no es favoritos', ()=>{
//                 //done []
//                 it('da un error por no recibir favoritos', ()=>{
//                     chai.request(app)
//                     .post('/favorites/1')
//                     .send({
//                         nothing: true
//                     })
//                     .end((_, res) => {
//                     expect(res).to.have.status(404)
//                     expect(res).to.be.json
//                     expect(JSON.parse(res.text))
//                         .to.eql({ message: "There were no valid data in the request" })          
//                     })
//                 })
//                 //done []
//                 it('da un error al no tener en favoritos validas id', ()=>{
//                     chai.request(app)
//                     .post('/favorites/1')
//                     .send({
//                         favorites: ['formula 1', 'nascar']
//                     })
//                     .end((_, res) => {
//                     expect(res).to.have.status(404)
//                     expect(res).to.be.json
//                     expect(JSON.parse(res.text))
//                         .to.eql({ message: "The id's of the favourite restaurants are not valid" })          
//                     })
//                 })
//             })
//         })
//         describe('agrega a un id de un usuario que no existe',()=>{
//             //done []
//             it('da un error al no encontrar tal usuario', () => {
//                 chai.request(app)
//                 .post('/favorites/2o3ij52')
//                 .send({
//                     favorites: [2, 4, 5, 8]
//                 })
//                 .end((_, res) => {
//                 expect(res).to.have.status(404)
//                 expect(res).to.be.json
//                 expect(JSON.parse(res.text))
//                     .to.eql({message: "The user id is not valid or the user does't exist"})          
//                 })
//             })
//         })
//     })

//     describe('DELETE /favorites/:id', ()=>{
//         describe('elimina de un usuario que existe', ()=>{
//             describe('elimina un favoritos que existe', ()=>{
//                 //done []
//                 it('elimina un favorito del usuario', ()=>{
//                     chai.request(app)
//                     .delete('/favorites/2')
//                     .send({
//                         id_restaurant: 1
//                     })
//                     .end((_, res) => {
//                     expect(res).to.have.status(201)
//                     expect(res).to.be.json
//                     expect(JSON.parse(res.text))
//                     .to.eql({ message: "favorito eliminado del usuario 2: Restaurant_id = 1"})          
//                     })
//                 })
//                 //done []
//                 it('elimina un favorito del usuario y muestra los favoritos del usuario', async ()=>{
//                     chai.request(app)
//                     .delete('/favorites/3')
//                     .send({
//                         id_restaurant: 1
//                     })
//                     .end((_, res) => {
//                     expect(res).to.have.status(200)
//                     expect(res).to.be.json
//                     expect(JSON.parse(res.text))
//                     .to.eql({ message: "favorito eliminado del usuario 1: Restaurant_id = 2"})
//                     })
                    
//                     chai.request(app)
//                     .get('/favorites/3')
//                     .end((_, res) =>{
//                     expect(res).to.have.status(200)
//                     expect(res).to.be.json
//                     expect(JSON.parse(res.text))
//                     .to.eql({id: 3, name: 'Matias', favorites: [2]})
//                     })
//                 })
//                 //done []
//                 it('elimina todos los favoritos del usuario', ()=>{
//                     chai.request(app)
//                     .delete('/favorites/3')
//                     .send({
//                         id_restaurant: 1
//                     })
//                     .end((_, res) => {
//                     expect(res).to.have.status(201)
//                     expect(res).to.be.json
//                     expect(JSON.parse(res.text))
//                     .to.eql({ message: "todos los favoritos del usuario 3 fueron eliminados"})
//                     })
//                     //{id: 4, name: 'Adam', favorites: [2,3]}
//                 })
//             })
//             describe('intenta eliminar favoritos que no existen', ()=>{
//                 //done []
//                 it('da error por no encontrar el favorito a eliminar', ()=>{
//                     chai.request(app)
//                     .delete('/favorites/3')
//                     .send({
//                         id_restaurant: 5
//                     })
//                     .end((_, res) => {
//                     expect(res).to.have.status(404)
//                     expect(res).to.be.json
//                     expect(JSON.parse(res.text))
//                     .to.eql({ message: "favorito a eliminar no encontrado"})
//                     })
//                 })
//             })
//         })
//         describe('elimina de un usuario que no existe', ()=>{
//             //done []
//             it('da error por no encontrar el usuario', ()=>{
//                 chai.request(app)
//                     .delete('/favorites/5555')
//                     .send({
//                         id_restaurant: 6
//                     })
//                     .end((_, res) => {
//                     expect(res).to.have.status(404)
//                     expect(res).to.be.json
//                     expect(JSON.parse(res.text))
//                     .to.eql({ message: "usuario a modificar no encontrado"})
//                     })
//             })
//         })
//     })

// })