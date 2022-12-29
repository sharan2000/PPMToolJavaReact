import { SET_LOADING } from "../actions/types";

const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    default:
      return state;
  }
};
