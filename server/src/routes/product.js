const express = require("express");
const { products } = require("../controllers/productController");

const productRouter = express.Router();

productRouter.get("/products-list", products);

module.exports = productRouter;