import { authService } from "../../services";
import { instanceWithAuth } from "../../utils/instances";
import { ACCOMTDETAILS, USERDETAILS } from "../actionTypes";

export const signup = (body) => (dispatch, getState) => {
  authService
    .signup(body)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      throw error;
    });
};

export const login = (body, callback) => (dispatch, getState) => {
  authService
    .login(body)
    .then((res) => {
      instanceWithAuth.defaults.headers.common["Authorization"] =
        res.data.userDetails.token;
      dispatch({
        type: USERDETAILS,
        payload: res.data.userDetails,
      });
      localStorage.setItem("userToken", JSON.stringify(res.data.userDetails));
      callback && callback(true);
    })
    .catch((error) => {
      dispatch({
        type: USERDETAILS,
        payload: [],
      });
      callback && callback(false);
    });
};

export const initload = () => (dispatch, getState) => {
  const details = localStorage.getItem("userToken");
  const data = JSON.parse(details);
  if (details) {
    console.log(details, data);
    instanceWithAuth.defaults.headers.common["Authorization"] = data.token;
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("userToken");
  instanceWithAuth.defaults.headers.common["Authorization"] = null;
  dispatch({
    type: USERDETAILS,
    payload: [],
  });
  dispatch({
    type: ACCOMTDETAILS,
    payload: [],
  });
};
