const express = require("express");
const bodyParser = require("body-parser");

const controller = require("../../service/controllers/eight-queens-Controller");

const router = express.Router();
router.use(bodyParser.json());

router.post("/createboard", controller.createGame);
router.post("/placequeen", controller.placequeen);
router.post("/getsolutions", controller.getsolutions);
router.post("/checksolution", controller.checksolutionWithBoard);

module.exports = router;
