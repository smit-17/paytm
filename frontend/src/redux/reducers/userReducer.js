import { ACCOMTDETAILS, GETALLUSERDETAILS } from "../actionTypes";

const initstate = {
  allUser: [],
  account:[]
};

export default (state = initstate, action) => {
  switch (action.type) {
    case GETALLUSERDETAILS:
      return {
        ...state,
        allUser: action.payload,
      };
    case ACCOMTDETAILS:
      return {
        ...state,
        account: action.payload,
      };
    default:
      return state;
  }
};
