const express = require("express");
const { addToCart } = require("../controllers/cartController");

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", addToCart);

module.exports = cartRouter;