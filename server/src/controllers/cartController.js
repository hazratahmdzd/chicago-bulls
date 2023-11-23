const { Cart } = require("../models/cart");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, count } = req.body;

    let cartItem = await Cart.findOne({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (cartItem) {
      cartItem.count += count;
      await cartItem.save();
    } else {
      await Cart.create({
        userId: userId,
        productId: productId,
        count: count,
      });
    }

    res.status(201).json({ message: "Product added to cart successfully." });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addToCart,
};
