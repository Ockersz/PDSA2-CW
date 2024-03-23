const jwt = require("jsonwebtoken");
const {
  generateBoard,
  placeQueen,
  isSafe,
} = require("../view-models/eight-queens/eight_queensVM");
require("dotenv").config();

let items = [
  { id: 1, name: "MetricsData 1" },
  { id: 2, name: "MetricsData 2" },
];

async function createGame(req, res) {
  res.send(await generateBoard(req.body.size));
}

async function placequeen(req, res) {
  res.send(await placeQueen(req.body.board, req.body.row, req.body.col));
}

async function getbyid(req, res) {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
  if (item) {
    res.send(item);
  } else {
    res.status(404).send("Item not found");
  }
}

async function remove(req, res) {
  const id = req.params.id;
  items = items.filter((item) => item.id !== parseInt(id));
  res.send(items);
}

async function update(req, res) {
  const id = req.params.id;
  const updatedItem = req.body;

  const index = items.findIndex((item) => item.id === parseInt(id));

  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem };
    res.send(items);
  } else {
    res.status(404).send("Item not found");
  }
}

module.exports = {
  placequeen: placequeen,
  createGame: createGame,
};
