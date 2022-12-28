import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  user: {},
  validToken: false,
};

const isValidPayload = (payload) => {
  if (Object.keys(payload).length > 0) {
    return true;
  }
  return false;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: isValidPayload(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};
