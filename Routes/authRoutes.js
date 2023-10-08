const express = require("express");
const { signUp, login } = require("../Controllers/authController");
const { HandleErrors } = require("../middlewares/handleError");

const authRoutes = express.Router();

authRoutes.post("/sign-up", HandleErrors(signUp));

authRoutes.post("/login", HandleErrors(login));

module.exports = { authRoutes };
