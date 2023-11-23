const bcrypt = require("bcrypt");
// const fs = require("fs");
// const path = require("path");
// const EmailService = require("../services/email");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const tokenService = require("../services/token");
const userService = require("../services/users")

async function refreshAccessToken( req, res ) {
  const { refreshToken: refreshTokenFromPayload } = req.body;
  const {accesToken, refreshToken} = await tokenService.refreshAccessToken(refreshTokenFromPayload);

  res.send({
    error: null,
    accesToken,
    refreshToken
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);

  if (email.trim() === "" || password.trim() === "") {
    return res.send({
      error: "Email and password are required",
    });
  }

  if (!user) {
    return res.send({
      error: "Email or password is incorrect!",
    });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.send({
      error: "Email or password is incorrect!",
    });
  }

  const { accesToken, refreshToken } = tokenService.generateTokenPair(user);

  res.send({
    error: null,
    accesToken,
    refreshToken
  });
}

async function registration(req, res) {
  const { fullName, email, password } = req.body;

  if ((email.trim() === "" || password.trim() === "", fullName.trim() === "")) {
    return res.send({
      error: "Name, email and password are required",
    });
  }

  const existingUser = await userService.getUserByEmail(email);

  if (existingUser) {
    return res.send({
      error: "User already exists!",
    });
  }

  const user = await userService.createUser(fullName, email, password)

  // const emailTemplate = fs
  //   .readFileSync(path.resolve("src", "email-templates", "confirmation.html"))
  //   .toString();
  // const confirmationURL = "http://localhost:8080/auth/email-confirmation";

  // EmailService.sendMail({
  //   from: "Chicago Bulls <info@chicago-bulls>",
  //   to: email,
  //   subject: "Confirm your email",
  //   html: emailTemplate
  //     .replace("{confirmationURL}", confirmationURL)
  //     .replace("{fullName}", fullName),
  // });

  return res.status(201).send({
    error: null,
    user: {
      id: user.id,
      fullName,
      email,
    },
  });
}

module.exports = {
  login,
  registration,
  refreshAccessToken
};
