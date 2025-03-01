import axios from "axios";

export const instanceWithAuth = axios.create({
  baseURL: "https://honoback-end.smitsurani18.workers.dev",
});
export const instanceWitouthAuth = axios.create({
  baseURL: "https://honoback-end.smitsurani18.workers.dev",
});
