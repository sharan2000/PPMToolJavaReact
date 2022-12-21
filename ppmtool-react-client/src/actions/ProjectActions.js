import {
  GET_ERRORS,
  GET_PROJECTS,
  GET_PROJECT,
  DELETE_PROJECT,
  CLEAR_PROJECT,
} from "./types";
import axios from "axios";

export const createProject = (project, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/project", project);
      navigate("/dashboard");
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };
};

export const getAllProjects = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/project/all");
      dispatch({
        type: GET_PROJECTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProjectById = (projectId, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/project/${projectId}`);
      dispatch({
        type: GET_PROJECT,
        payload: res.data,
      });
    } catch (error) {
      navigate("/dashboard");
    }
  };
};

export const clearProject = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_PROJECT,
    });
  };
};

export const deleteProject = (projectId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/project/${projectId}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
