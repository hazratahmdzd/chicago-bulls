const { Model } = require("sequelize");
const jwt = require("jsonwebtoken");

const userService = require("./users")

function generateTokenPair(user) {
  const accesToken = jwt.sign(
    {
      userId: user.id,
      fullName: user.fullName,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1m",
    }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30days" }
  );

  return {
    accesToken,
    refreshToken,
  };
}

async function refreshAccessToken(refreshToken) {
    const { userId } = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    const user = await userService.getUserById(userId);
    return generateTokenPair(user);
}

module.exports = {
    generateTokenPair,
    refreshAccessToken
}
