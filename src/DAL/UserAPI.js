import { httpGet, httpPost, httpPut } from "./CRUD_Service";
import { origin } from "./http_Service";
// / / / / / / / / / / / / / / / / //
// NODE
// / / / / / / / / / / / / / / / / //
let url = origin + "/users";
const token = localStorage.getItem('token');

// login after signup
export const getUserById = async (id) => {
  return await httpGet(`${url}/login?${id}`);
};

export const updateUserDetails = async (details) => {
  return httpPut(`${url}/update-details`, details);
};

export const doesTokenExists = async () => {
  return await httpGet(`${url}/login/${token}`);
};

export const loginUser = async (loginData) => {
  const result =  await httpPost(`${url}/login`, loginData);
  return result;
};

export const createUser = async (data) => {
  return await httpPost(`${url}/signup`, data);
};

export const verify = async (data) => {
  return await httpPost(`${url}/verify`, data);
};

// / / / / / / / / / / / / / / / / //
// / / / / / / / / / / / / / / / / //
// FLASK
// / / / / / / / / / / / / / / / / //

// const url_flask_users = "http://localhost:5000/users";

// const config = {
//   headers: {
//     "Access-Control-Allow-Origin": "http://localhost:3000",
//     "Access-Control-Allow-Credentials": true,
//   },
//   withCredentials: true,
// };

// export const isCookie = async () => {
//   return axios.get(`${url_flask_users}/login-with-cookie`, config);
// };

// export const loginUser = async (loginData) => {
//   return await axios.post(`${url_flask_users}/login`, loginData, config);
// };

// export const createUser = async (data) => {
//   return await axios.post(`${url_flask_users}/signup`, data, config);
// };

// export const logoutUser = async () => {
//   return axios.post(`${url_flask_users}/logout`, config);
// };

// export const updateUserDetails = async (details) => {
//   return axios.put(`${url_flask_users}/update-details`, details, config);
// };
