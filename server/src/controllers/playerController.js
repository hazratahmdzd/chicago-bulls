const bcrypt = require("bcrypt");

const Player = require("../models/player");

async function players(req, res) {
  const playersData = await Player.findAll();

  return res.status(201).send({
    error: null,
    players: playersData,
  });
}

module.exports = {
  players,
};
