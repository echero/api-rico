const express = require("express")
// para establecer las distintas rutas, necesitamos instanciar el express router
const router = express.Router() 

const controller = require("../controllers/RestaurantController");
//establecemos nuestras rutas
//prefijos '/' - '/:id' 
router.get("/", controller.get);
router.get("/:id", controller.id);
router.get("/:id/reviews", controller.reviews);
router.get("/:id/menus", controller.menus);
router.post("/", controller.post)
router.delete("/:id", controller.delete)
router.put("/:id", controller.put)

module.exports = router;