import { CLEAR_ERRORS, GET_ERRORS, GET_PROJECTS } from "../actions/types";

const initialState = {
  projects: [],
  project: {},
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    default:
      return state;
  }
};
