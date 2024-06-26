require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const {
  authenticateToken,
} = require("./service/controllers/middleware/auth-controller.js");

app.use(express.json());
app.use(cors());

const eightQueensRoute = require("./api/routes/eight-queens.routes.js");
const ticTacToeRoute = require("./api/routes/tic-tac-toe.routes.js");
const rememberValueIndexRoute = require("./api/routes/remember-value-index.routes.js");
const predictValueIndexRoute = require("./api/routes/predict-value-index.routes.js");
const shortestPathRoute = require("./api/routes/shortest-path.routes.js");

app.use("/api/eightQueens", eightQueensRoute);
app.use("/api/ticTacToe", ticTacToeRoute);
app.use("/api/rememberValueIndex", rememberValueIndexRoute);
app.use("/api/predictValueIndex", predictValueIndexRoute);
app.use("/api/shortestPath", shortestPathRoute);

module.exports = app;
