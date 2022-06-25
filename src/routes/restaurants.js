const express = require('express');
// para establecer las distintas rutas, necesitamos instanciar el express router
const router = express.Router();

const RestaurantController = require('../controllers/RestaurantController');

router.get('/', RestaurantController.getAll);
router.get('/:id', RestaurantController.getById);
router.post('/', RestaurantController.create);
router.delete('/:id', RestaurantController.remove);
router.put('/:id', RestaurantController.update);

module.exports = router;
