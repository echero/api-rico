const express = require("express")
// para establecer las distintas rutas, necesitamos instanciar el express router
const router = express.Router() 

const controller = require("../controllers/ReviewController");
router.get('/restaurant/:id', controller.getByRestaurantId);
router.get('/user/:id', controller.getByUserId);
router.post('/', controller.create);

module.exports = router;