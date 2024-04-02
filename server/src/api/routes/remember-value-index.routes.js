const express = require("express");
const bodyParser = require("body-parser");

const controller = require("../../service/controllers/remember-value-index-Controller");

const router = express.Router();
router.use(bodyParser.json());

router.get("/genarray", controller.generateArray);
router.get("/gettime", controller.getTimeTaken);
router.get("/startgame", controller.startgame);
router.post("/saveSolution", controller.saveSol);

module.exports = router;
