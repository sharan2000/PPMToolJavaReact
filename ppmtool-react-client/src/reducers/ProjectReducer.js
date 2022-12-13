import {
  GET_PROJECTS,
  GET_PROJECT,
  DELETE_PROJECT,
  CLEAR_PROJECT,
} from "../actions/types";

const initialState = {
  projects: [],
  project: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    case CLEAR_PROJECT:
      return {
        ...state,
        project: {},
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
