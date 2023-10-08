import axios from "axios";

// const BASE_URL = "http://localhost:3001";

const token = localStorage.getItem("token");
export const addPODetails = (data) => {
  const tokenn = localStorage.getItem("token");
  return axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      auth: `Bearer ${tokenn ? JSON.parse(tokenn) : ""}`,
    },

    url: `/api/v1/po/add-po-details`,
    data,
  });
};
export const deletePODetails=(po_number)=>{
  console.log("delete po",po_number);
  const tokenn = localStorage.getItem("token");
  return axios({
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      auth: `Bearer ${tokenn ? JSON.parse(tokenn) : ""}`
      
    },
  

    url: `/api/v1/po/delete-po-list/${po_number}`,
  });
};
export const editPODetails=(data)=>{
  // console.log("delete po",po_number);
  const tokenn = localStorage.getItem("token");
  return axios({
    method: "put",
    headers: {
      "Content-Type": "application/json",
      auth: `Bearer ${tokenn ? JSON.parse(tokenn) : ""}`
      
    },
    url: `/api/v1/po/update-po-details`,
    data,
  });
};

export const getPODetails = (limit=2,offset=0) => {
  console.log("inside po axios");
const tokenn = localStorage.getItem("token");
return (axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      auth: `Bearer ${tokenn ? JSON.parse(tokenn) : ""}`
      
    },
  

    url: `/api/v1/po/get-po-list/${limit}?offset=${offset}`,
  })  .catch(function (error) {
    return error.response;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }));

};
