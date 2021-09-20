import axios from "axios";

export const origin =
  process.env.NODE_ENV === "development" ? "http://localhost:3100" : "https://recipes-db-mm.herokuapp.com";

export const httpService = (method, url, data, token) => {
  return axios({
    method: method,
    url: url,
    data,
    headers: { "Access-Control-Allow-Origin": origin, token },
    withCredentials: true,
  });
};
