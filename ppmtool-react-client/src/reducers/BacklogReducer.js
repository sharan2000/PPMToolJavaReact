import {
  GET_BACKLOG,
  GET_PROJECT_TASK,
  CLEAR_BACKLOG,
  CLEAR_PROJECT_TASK,
  DELETE_PROJECT_TASK,
} from "../actions/types";

const initialState = {
  projectTasks: [],
  projectTask: {},
  deleteTaskProjSeq: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        projectTasks: action.payload,
      };
    case CLEAR_BACKLOG:
      return {
        ...state,
        projectTasks: [],
      };
    case GET_PROJECT_TASK:
      return {
        ...state,
        projectTask: action.payload,
      };
    case CLEAR_PROJECT_TASK:
      return {
        ...state,
        projectTask: {},
      };
    case DELETE_PROJECT_TASK:
      return {
        ...state,
        deleteTaskProjSeq: action.payload,
      };
    default:
      return state;
  }
};
