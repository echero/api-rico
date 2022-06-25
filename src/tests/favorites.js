const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require('mocha');

const { expect } = chai;
const app = require('../index');

chai.use(chaiHttp);

describe('API RICO Favorites', () => {
  describe('GET /favorites', () => {
    // done [✔]
    it('trae todos los usuarios con sus nombres y favoritos', async function () {
      chai
        .request(app)
        .get('/favorites')
        .end((_, res) => {
          expect(res).to.have.status(200);
          // expect(res).to.be.json;
          console.log('[respuesta 0 ] => ', res.text); // BUG
          expect(JSON.parse(res.text)).to.eql([
            { id: 1, name: 'Ezequiel', favorites: [1] },
            { id: 2, name: 'Javier', favorites: [1, 3] },
            { id: 3, name: 'Matias', favorites: [1, 2] },
            { id: 4, name: 'Adam', favorites: [2, 3] },
            { id: 5, name: 'noname', favorites: [] },
          ]);
        });
    });
  });

  describe('GET /favorites/:id', () => {
    // done [✔]
    it('trae favoritos del usuario', function () {
      chai
        .request(app)
        .get('/favorites/1')
        .end((_, res) => {
          console.log('[respuesta 1 ] => ', res.text); // BUG
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(JSON.parse(res.text)).to.eql({
            id: 1,
            name: 'Ezequiel',
            favorites: [1],
          });
        });
    });
    // done [✔]
    it('trae error si no tiene favoritos el usuario', function () {
      chai
        .request(app)
        .get('/favorites/5')
        .end((_, res) => {
          console.log('[respuesta 2 ] => ', res.text); // BUG
          expect(res).to.have.status(404);
          expect(res).to.be.json;
          expect(JSON.parse(res.text)).to.eql({
            message: 'There are no favorites for this user',
          });
        });
    });
    // done [✔]
    it('trae error si no existe ese usuario', function () {
      chai
        .request(app)
        .get('/favorites/333')
        .end((_, res) => {
          console.log('[respuesta 3 ] => ', res.text); // BUG
          expect(res).to.have.status(404);
          expect(res).to.be.json;
          expect(JSON.parse(res.text)).to.eql({
            message: 'There are no users with that id',
          });
        });
    });
  });
  describe('POST /favorites/:id', () => {
    describe('agrega a un id de un usuario que existe', () => {
      describe('agrega en un usuario favoritos', () => {
        // done [✔]
        it('agrega favoritos al usuario', function () {
          chai
            .request(app)
            .post('/favorites/1')
            .send({
              favorites: [2, 3],
            })
            .end((_, res) => {
              console.log('[respuesta 4 ] => ', res.text); // BUG
              expect(res).to.have.status(201); // CREATED
              expect(res).to.be.json;
              expect(JSON.parse(res.text)).to.eql({
                message: 'Favorites list updated',
              });
            });
          // added
          chai
            .request(app)
            .get('/favorites')
            .end((_, res) => {
              console.log('[respuesta 4 B ] => ', res.text); // BUG
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              console.log(res.text);
              expect(JSON.parse(res.text)).to.eql([
                { id: 1, name: 'Ezequiel', favorites: [1, 2, 3] },
                { id: 2, name: 'Javier', favorites: [1, 3] },
                { id: 3, name: 'Matias', favorites: [1, 2] },
                { id: 4, name: 'Adam', favorites: [2, 3] },
                { id: 5, name: 'noname', favorites: [] },
              ]);
            });
        });
        // done[✔]
        it('agrega un favorito al usuario y lo muestra', function () {
          chai
            .request(app)
            .post('/favorites/2')
            .send({
              favorites: [2, 3],
            })
            .end((_, res) => {
              console.log('[respuesta 5 ] => ', res.text); // BUG
              expect(res).to.have.status(201);
              expect(res).to.be.json;
              expect(JSON.parse(res.text)).to.eql({
                message: 'Favorites list updated',
              });
            });

          chai
            .request(app)
            .get('/favorites/2')
            .end((_, res) => {
              console.log('[respuesta 6 ] => ', res.text); // BUG
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(JSON.parse(res.text)).to.eql({
                id: 2,
                name: 'Javier',
                favorites: [1, 3, 2],
              });
            });
        });
        // done [✔]
        it('da un error al no encontrar restaurants con las id recibidas', function () {
          chai
            .request(app)
            .post('/favorites/1')
            .send({
              favorites: [912889, 545011],
            })
            .end((_, res) => {
              console.log('[respuesta 7 ] => ', res.text); // BUG
              expect(res).to.have.status(404);
              expect(res).to.be.json;
              expect(JSON.parse(res.text)).to.eql({
                message:
                  "the restaurants weren't found, some or all of the id's provided may not be from restaurants in the database",
              });
            });
        });
      });
      describe('intenta agregar en usuario algo que no es favoritos', () => {
        // not done []// error
        it('da un error por no recibir favoritos', function () {
          chai
            .request(app)
            .post('/favorites/1')
            .send({
              nothing: true,
            })
            .end((_, res) => {
              console.log('[respuesta 8 ] => ', res.text); // BUG
              expect(res).to.have.status(404);
              expect(res).to.be.json;
              expect(JSON.parse(res.text)).to.eql({
                message: 'There were no valid data in the request',
              });
            });
        });
      });
    });
    describe('agrega a un id de un usuario que no existe', () => {
      // done [✔]
      it('da un error al no encontrar tal usuario', function () {
        chai
          .request(app)
          .post('/favorites/o3ij52')
          .send({
            favorites: [2, 1, 3],
          })
          .end((_, res) => {
            console.log('[respuesta 9 ] => ', res.text); // BUG
            expect(res).to.have.status(404); // may fail
            expect(res).to.be.json;
            expect(JSON.parse(res.text)).to.eql({
              message: "The user id is not valid or the user does't exist",
            });
          });
      });
    });
  });
  //
  describe('DELETE /favorites/:id', () => {
    describe('elimina de un usuario que existe', () => {
      describe('elimina un favoritos que existe', () => {
        // done [✔]
        it('elimina un favorito del usuario', function () {
          chai
            .request(app)
            .delete('/favorites/2')
            .send({
              id_restaurant: 1,
            })
            .end((_, res) => {
              console.log('[respuesta 10 ] => ', res.text); // BUG
              expect(res).to.have.status(201);
              expect(res).to.be.json;
              expect(JSON.parse(res.text)).to.eql({
                message: 'Favorite deleted from the users list',
              });
            });
        });
        // done [✔]
        it('elimina un favorito del usuario y muestra los favoritos del usuario', async function () {
          chai
            .request(app)
            .delete('/favorites/3')
            .send({
              id_restaurant: 1,
            })
            .end((_, res) => {
              console.log('[respuesta 11 ] => ', res.text); // BUG
              expect(res).to.have.status(201);
              expect(res).to.be.json;
              expect(JSON.parse(res.text)).to.eql({
                message: 'Favorite deleted from the users list',
              });
            });

          chai
            .request(app)
            .get('/favorites/3')
            .end((_, res) => {
              console.log('[respuesta 11 B ] => ', res.text); // BUG
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(JSON.parse(res.text)).to.eql({
                id: 3,
                name: 'Matias',
                favorites: [2],
              });
            });
        });
      });
      describe('intenta eliminar favoritos que no existen', () => {
        // done [✔]
        it('da error por no encontrar el favorito a eliminar', function () {
          chai
            .request(app)
            .delete('/favorites/3')
            .send({
              id_restaurant: 5,
            })
            .end((_, res) => {
              console.log('[respuesta 12 ] => ', res.text); // BUG
              expect(res).to.have.status(404);
              expect(res).to.be.json;
              expect(JSON.parse(res.text)).to.eql({
                message: "the favorite restaurant wasn't found",
              });
            });
        });
      });
    });
    describe('elimina de un usuario que no existe', () => {
      // done [✔]
      it('da error por no encontrar el usuario', function () {
        chai
          .request(app)
          .delete('/favorites/5555')
          .send({
            id_restaurant: 6,
          })
          .end((_, res) => {
            console.log('[respuesta 13 ] => ', res.text); // BUG
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            expect(JSON.parse(res.text)).to.eql({
              message: 'There are no users with that id',
            });
          });
      });
    });
  });
  //
});
