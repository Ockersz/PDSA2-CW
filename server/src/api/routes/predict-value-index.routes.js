const express = require("express");
const bodyParser = require("body-parser");

const controller = require("../../service/controllers/predict-value-index-Controller");

const router = express.Router();
router.use(bodyParser.json());

router.get("/predict", controller.getIndexValue);
router.post("/saveSolution", controller.saveSol);

module.exports = router;
