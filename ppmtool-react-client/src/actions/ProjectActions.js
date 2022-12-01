import { GET_ERRORS, CLEAR_ERRORS, GET_PROJECTS } from "./types";
import axios from "axios";

export const createProject = (project, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/project",
        project
      );
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
      const res = await axios.get("http://localhost:8080/api/project/all");
      dispatch({
        type: GET_PROJECTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
