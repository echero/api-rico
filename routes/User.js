const express = require("express");
const router = express.Router();

const controller = require("../controllers/UserController");

router.get("/", controller.get);
router.post("/", controller.post);

// route.post("/", (req, res) =>{
//     res.send("Tu usuario se a creado correctamente")
// });

module.exports = router;