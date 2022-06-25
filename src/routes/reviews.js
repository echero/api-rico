const express = require('express');
// para establecer las distintas rutas, necesitamos instanciar el express router
const router = express.Router();

const ReviewController = require('../controllers/ReviewController');

router.get('/restaurant/:id', ReviewController.getByRestaurantId);
// router.get('/user/:id', ReviewController.getByUserId);
router.post('/', ReviewController.create);

module.exports = router;
