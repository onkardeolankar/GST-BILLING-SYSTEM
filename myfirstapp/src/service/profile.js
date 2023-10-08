import axios from "axios";

// const BASE_URL = "http://localhost:3001";



export const getProfileDetails = () => {
  
const token = localStorage.getItem("token");
  console.log("inside po axios");
  return axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      auth: `Bearer ${token ? JSON.parse(token) : ""}`
      
    },
  

    url: `/api/v1/profile/get-profile`,
  });

};

