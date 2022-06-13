const express = require("express")
// para establecer las distintas rutas, necesitamos instanciar el express router
const router = express.Router() 

const controller = require("../controllers/MenusController");
//establecemos nuestras rutas
//prefijos '/' - '/:id' 
router.get("/", controller.get);
router.get("/:id", controller.id);
router.get("/:id/plates", controller.idPlates);
router.get("/:id/plate/:id2", controller.idPlate);
router.post("/", controller.post);
router.post("/:id/plate", controller.postPlate);
router.delete("/:id", controller.delete);
router.delete("/:id/plates", controller.deletePlates);
router.delete("/:id/plate/:id2", controller.deletePlate);

module.exports = router;