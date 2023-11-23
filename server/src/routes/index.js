const express = require("express");
const authRouter = require("./auth");
const playerRouter = require("./player");
const productRouter = require("./product");

const APP_ROUTER = express.Router();

APP_ROUTER.use(authRouter)
APP_ROUTER.use(playerRouter)
APP_ROUTER.use(productRouter)

module.exports = APP_ROUTER;


