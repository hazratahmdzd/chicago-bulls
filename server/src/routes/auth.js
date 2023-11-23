const express = require("express");
const { login, registration, refreshAccessToken } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/auth/login", login);
authRouter.post("/auth/register", registration);
authRouter.post("/auth/token", refreshAccessToken)

module.exports = authRouter;
