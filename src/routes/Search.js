const express = require('express');

const router = express.Router();

const controller = require('../controllers/SearchController');

router.get('/', controller.get);

module.exports = router;
// Busqueda: /api/search/  .........................  (Get)
