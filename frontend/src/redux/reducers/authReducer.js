import { USERDETAILS } from "../actionTypes";

const initstate = {
  userDetails: [],
};

export default (state = initstate, action) => {
  switch (action.type) {
    case USERDETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    default:
      return state;
  }
};
