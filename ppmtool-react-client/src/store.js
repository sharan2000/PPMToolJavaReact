import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import BacklogReducer from "./reducers/BacklogReducer";
import ErrorReducer from "./reducers/ErrorReducer";
import ProjectReducer from "./reducers/ProjectReducer";
import SecurityReducer from "./reducers/SecurityReducer";
import UtilsReducer from "./reducers/UtilsReducer";

const reducer = {
  // add all reducers here
  projects: ProjectReducer,
  backlog: BacklogReducer,
  errors: ErrorReducer,
  security: SecurityReducer,
  utils: UtilsReducer,
};

const middleware = [thunk];

const initialState = {};

let store = configureStore({
  preloadedState: initialState,
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
