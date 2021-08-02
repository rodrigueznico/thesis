import axios from "axios";

const baseURL = "http://localhost:8080";

export const getAxInstanceWithHeaders = token => axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  }
});

export const getAxInstance = axios.create({
  baseURL: baseURL
});
