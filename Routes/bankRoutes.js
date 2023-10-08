const express = require("express");
const {
  addBankDetails,
  getBanksList,
  deleteBanksList,
  editBankDetails,
} = require("../Controllers/bankController");
const Auth = require("../middlewares/auth");
const { HandleErrors } = require("../middlewares/handleError");

const bankRoutes = express.Router();

bankRoutes.post("/add-po-details", Auth, HandleErrors(addBankDetails));
bankRoutes.put("/update-po-details", Auth, HandleErrors(editBankDetails));
bankRoutes.get("/get-po-list/:limit",Auth, HandleErrors(getBanksList));
bankRoutes.delete("/delete-po-list/:id",Auth, HandleErrors(deleteBanksList))

module.exports = { bankRoutes };
