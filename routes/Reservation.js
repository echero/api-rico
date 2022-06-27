const express = require("express")
// para establecer las distintas rutas, necesitamos instanciar el express router
const router = express.Router() 

const controller = require("../controllers/ReservationController");
//establecemos nuestras rutas
 
router.get("/", controller.get);
router.get("/:id", controller.getRestaurantById); //reservas por id del restaurante
router.post("/", controller.create); //crear una reserva pasandole el modelo de reserva
router.delete("/:id", controller.remove); //cancelar la reserva…
router.put("/:id", controller.update) // actualizar el dia y la hora
module.exports = router;