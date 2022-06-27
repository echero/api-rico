const express = require("express")
// para establecer las distintas rutas, necesitamos instanciar el express router
const router = express.Router() 

const controller = require("../controllers/ReviewController");
<<<<<<< HEAD
//establecemos nuestras rutas
//prefijos '/' - '/:id' 
router.get("/", controller.get);
router.get("/:id", controller.id);
router.post("/", controller.post);
router.delete("/:id", controller.delete);
=======
router.get('/restaurant/:id', controller.getByRestaurantId);
// router.get('/user/:id', controller.getByUserId); //este creo que no funciona por el usuario
router.post('/', controller.create);
>>>>>>> f99f952515136568b07d38b1b2758c7569fff110

module.exports = router;