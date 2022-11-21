import axios from "axios";

export const api = axios.create({
  baseURL: "https://csci341-backend.herokuapp.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
