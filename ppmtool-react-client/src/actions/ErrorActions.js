import { CLEAR_ERRORS } from "./types";

export const clearErrors = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
};
