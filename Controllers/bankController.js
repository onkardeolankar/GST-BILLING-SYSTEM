const { request } = require("express");
const BankService = require("../Services/bankService");

const addBankDetails = async (req, res) => {
  const userId = req.id;
  // console.log(">>>>>>>>>>>>>>>", userId);
  const response = await BankService.addBankDetails({
    ...req.body,
    user_id: userId,
  });

  res.send(response);
};
const editBankDetails = async (req, res) => {
  const userId = req.id;
  console.log(">>>>>>>>>>>>>>>edited", userId);
  console.log(req.body);
  const response = await BankService.editBankDetails({
    ...req.body
    // user_id: userId,
  });

  res.send(response);
};

const getBanksList = async (req, res) => {
  // console.log("inside po list");
  console.log("get bank list",req.query);
 
  const response = await BankService.getBankDetails(req.params,req.query);
  // console.log("<<response",response);

  res.send(response);
};
const deleteBanksList = async (req, res) => {
  // console.log("inside po list");
//  console.log(req.params);
  const response = await BankService.deleteBankDetails(req.params);
  // console.log("<<response",response);

  res.send(response);
};

module.exports = { addBankDetails, getBanksList,deleteBanksList,editBankDetails };
