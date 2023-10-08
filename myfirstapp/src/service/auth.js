import axios from "axios";

// const BASE_URL ='http://localhost:3001';

export const signUp = (data) => {
  console.log("in axios...");
  return axios.post(`/api/v1/auth/sign-up`, data);
};

export const login = (data) => {
  return axios.post(`/api/v1/auth/login`, data);
};
