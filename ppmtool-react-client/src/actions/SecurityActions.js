import axios from "axios";
import setJwtToken from "../SecurityUtils/setJwtToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

import jwt_decode from "jwt-decode";

export const registerUser = (user, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/users/register", user);
      navigate("/login");
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };
};

export const login = (loginRequestData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/users/login", loginRequestData);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setJwtToken(token);

      const decodedData = jwt_decode(token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: decodedData,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("jwtToken");
    setJwtToken(false);
    dispatch({
      type: SET_CURRENT_USER,
      payload: {},
    });
  };
};
