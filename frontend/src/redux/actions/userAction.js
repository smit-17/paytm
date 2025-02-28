import { userService } from "../../services";
import { ACCOMTDETAILS, GETALLUSERDETAILS } from "../actionTypes";

export const getAlluser = (search) => (dispatch, getState) => {
  userService
    .getAllUserData(search)
    .then((res) => {
      dispatch({
        type: GETALLUSERDETAILS,
        payload: res.data.users,
      });
    })
    .catch((error) => {
      throw error;
    });
};

export const getUserBalance = () => (dispatch, getState) => {
  userService
    .getUserBalance()
    .then((res) => {
      dispatch({
        type: ACCOMTDETAILS,
        payload: res.data.balance,
      });
    })
    .catch((error) => {
      throw error;
    });
};
export const transferAmount =
  (amount, to, callback) => (dispatch, getState) => {
    const balance = Number(amount);
    userService
      .transferAmount(balance, to)
      .then((res) => {
        if (res.status == 200) {
          callback && callback(true);
        }
      })
      .catch((error) => {
        throw error;
        callback && callback(true);
      });
  };
