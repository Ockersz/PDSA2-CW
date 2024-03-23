require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());

const {
  authenticateToken,
} = require("./service/controllers/middleware/auth-controller.js");

app.use(express.json());

const eightQueensRoute = require("./api/routes/eight-queens.routes.js");

app.use("/api/eightQueens", eightQueensRoute);

module.exports = app;
