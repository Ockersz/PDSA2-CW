const express = require("express");
const bodyParser = require("body-parser");

const controller = require("../../service/controllers/tic-tac-toe-Controller");

const router = express.Router();
router.use(bodyParser.json());

router.post("/createboard", controller.createGame);
router.post("/makemove", controller.makemove);

module.exports = router;
