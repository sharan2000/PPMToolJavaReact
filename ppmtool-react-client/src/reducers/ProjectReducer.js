import {
  CLEAR_ERRORS,
  GET_ERRORS,
  GET_PROJECTS,
  GET_PROJECT,
  DELETE_PROJECT,
} from "../actions/types";

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
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (proj) => proj.projectIdentifier !== action.payload
        ),
      };
    default:
      return state;
  }
};
