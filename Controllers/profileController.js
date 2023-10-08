const { request } = require("express");
const profileService = require("../Services/profileService");

const getProfile = async (req, res) => {
    // console.log("inside po list");
   
    const response = await profileService.getProfileDetails();
    console.log("<<response",response);
  
    res.send(response);
  };
  module.exports = { getProfile };