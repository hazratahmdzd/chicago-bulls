const express = require("express");
const { players } = require("../controllers/playerController");

const playerRouter = express.Router();

playerRouter.get("/players-list", players);

module.exports = playerRouter;
