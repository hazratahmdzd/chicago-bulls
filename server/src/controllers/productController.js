const bcrypt = require("bcrypt");

const Product = require("../models/product");

async function products(req, res) {
  const productsData = await Product.findAll();

  return res.status(201).send({
    error: null,
    products: productsData,
  });
}

module.exports = {
  products,
};
