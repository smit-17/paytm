import { URLS } from "../utils/environment";
import api from "./api";

const getAllUserData = (search) => {
  return api
    .getWithInstances(`${URLS.GETALLUSER}?filter=${search}`)
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
const getUserBalance = () => {
  return api
    .getWithInstances(URLS.GETBALANCE)
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
const transferAmount = (balance, to) => {
  const body = {
    amount: balance,
    to: to,
  };
  return api
    .postWithInstances(URLS.TRANSFER, body)
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
export default {
  getAllUserData,
  getUserBalance,
  transferAmount,
};
