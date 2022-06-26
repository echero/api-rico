const express = require("express")
// para establecer las distintas rutas, necesitamos instanciar el express router
const router = express.Router() 

const controller = require("../controllers/ReservationController");
//establecemos nuestras rutas
//prefijos '/' - '/:id' 
router.get("/:id", controller.get); //reservas por id del restaurante
//router.post("/", controller.post); //crear una reserva pasandole el modelo de reserva
//router.delete("/:id", controller.delete); //cancelar la reserva…
//router.update("/:id", controller.update) // actualizar el dia y la hora
module.exports = router;