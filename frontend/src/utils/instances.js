import axios from "axios";

export const instanceWithAuth = axios.create({
  baseURL: "http://127.0.0.1:8787",
});
export const instanceWitouthAuth = axios.create({
  baseURL: "http://127.0.0.1:8787",
});
