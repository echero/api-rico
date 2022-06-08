const express = require("express")
// para establecer las distintas rutas, necesitamos instanciar el express router
const router = express.Router() 

const controller = require("../controllers/RestaurantController");
//establecemos nuestras rutas
//prefijos '/' - '/:id' 
router.get("/", controller.get);
router.get("/:id", controller.id);
router.post("/", controller.post)

module.exports = router;