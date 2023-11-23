const express = require("express");
const cors = require("cors");
const sequelize = require("./database/index");
const User = require("./models/user");
const Player = require("./models/player");
const Product = require("./models/product");
const ProductCategory = require("./models/productCategory");
const APP_ROUTER = require("./routes");
const authMiddleware = require("./middlewares/authMiddleware")

// Product.belongsTo(User, { as: "user" });
// Product.belongsTo(ProductCategory, { as: "productCategory" });
// ProductCategory.belongsTo(ProductCategory, { as: "parent" });

sequelize.sync();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  })
);
app.use(authMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(APP_ROUTER);

app.get("/", function (req, res) {
  res.send("OK!");
});

module.exports = app;
