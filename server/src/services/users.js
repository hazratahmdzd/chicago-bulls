const bcrypt = require("bcrypt");
const User = require("../models/user");

const SALT_ROUNDS = 10;

async function getUserByEmail(email) {
  return await User.findOne({ where: { email } });
}
async function getUserById(userId) {
  return await User.findByPk(userId);
}

async function createUser(fullName, email, password) {
  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });
  return user;
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
}
