const express = require("express");
const {
  getProfile,
} = require("../Controllers/profileController");
const Auth = require("../middlewares/auth");
const { HandleErrors } = require("../middlewares/handleError");

const profileRoutes = express.Router();

profileRoutes.get("/get-profile",Auth, HandleErrors(getProfile));

module.exports = { profileRoutes };
