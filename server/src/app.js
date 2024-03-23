require("dotenv").config();
const express = require("express");
const app = express();
const {
  authenticateToken,
} = require("./service/controllers/middleware/auth-controller.js");

app.use(express.json());

const eightQueensRoute = require("./api/routes/eight-queens.routes.js");

app.use("/api/eightQueens", eightQueensRoute);

module.exports = app;
