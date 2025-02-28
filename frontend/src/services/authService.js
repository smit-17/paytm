import api from "./api";
import { URLS } from "../utils/environment";

const signup = (body) => {
  console.log(body);

  return api
    .postWithoutInstances(URLS.SIGNUP, body)
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
      };
    })
    .catch((error) => {
      throw error;
    });
};
const login = (body) => {
  console.log(body);

  return api
    .postWithoutInstances(URLS.SIGNIN, body)
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
      };
    })
    .catch((error) => {
      throw error;
    });
};

export default { signup, login };
