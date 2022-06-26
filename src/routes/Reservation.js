const express = require('express');
// para establecer las distintas rutas, necesitamos instanciar el express router
const router = express.Router();

const controller = require('../controllers/ReservationController');
// establecemos nuestras rutas
// prefijos '/' - '/:id'
router.get('/', controller.get); // reservas por id del restaurante
// router.get("/:id", controller.get);  // id del restaurante y el dia para que traiga todas las reservas de ese dia
// router.post("/:id", controller.post); //crear una reserva pasandole el modelo de reserva
// router.delete("/:id", controller.delete); //cancelar la reserva…
//router.update("/:id", controller.update)

module.exports = router;
