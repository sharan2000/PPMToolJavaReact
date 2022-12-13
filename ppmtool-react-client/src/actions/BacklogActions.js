import axios from "axios";

import {
  GET_ERRORS,
  GET_BACKLOG,
  CLEAR_BACKLOG,
  GET_PROJECT_TASK,
  CLEAR_PROJECT_TASK,
  DELETE_PROJECT_TASK,
} from "./types";

export const addProjectTask = (backlog_id, projectTask, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/api/backlog/${backlog_id}`, projectTask);
      navigate(`/projectboard/${backlog_id}`);
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };
};

export const getBacklog = (backlog_id, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/backlog/${backlog_id}`);
      dispatch({
        type: GET_BACKLOG,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };
};

export const clearBacklog = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_BACKLOG,
    });
  };
};

export const getProjectTask = (backlog_id, projectSequence, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `/api/backlog/${backlog_id}/${projectSequence}`
      );
      dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data,
      });
    } catch (error) {
      navigate("/dashboard");
    }
  };
};

export const clearProjectTask = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_PROJECT_TASK,
    });
  };
};

export const updateProjectTask = (
  backlog_id,
  projectSequence,
  updatedProjectTask,
  navigate
) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `/api/backlog/${backlog_id}/${projectSequence}`,
        updatedProjectTask
      );
      navigate(`/projectboard/${backlog_id}`);
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };
};

export const deleteProjectTask = (backlog_id, projectSequence) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/backlog/${backlog_id}/${projectSequence}`
      );
      dispatch({
        type: DELETE_PROJECT_TASK,
        payload: projectSequence,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
