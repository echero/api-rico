const express = require("express")
const router = express.Router()

const controller = require('../controllers/RegisterController');

router.get("/", controller.get);
router.get("/:id", controller.id)

module.exports = router;

//-Registro: /api/register  .........................  (Post)