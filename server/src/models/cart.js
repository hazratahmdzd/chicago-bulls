const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/index");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    count: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Cart;
