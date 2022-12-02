import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_PROJECTS,
  GET_PROJECT,
  DELETE_PROJECT,
} from "./types";
import axios from "axios";

export const createProject = (project, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/project", project);
      dispatch({
        type: CLEAR_ERRORS,
      });
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
