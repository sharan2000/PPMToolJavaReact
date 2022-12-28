import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProject from "./components/project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/layout/Landing";
import Login from "./components/UserManagement/Login";
import Register from "./components/UserManagement/Register";
import setJwtToken from "./SecurityUtils/setJwtToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/SecurityActions";

import SecureRoute from "./SecurityUtils/SecureRoute";
import NotFound from "./SecurityUtils/NotFound";

const jwtToken = localStorage.getItem("jwtToken");

if (jwtToken) {
  try {
    const jwtDecodedData = jwt_decode(jwtToken);

    setJwtToken(jwtToken);
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: jwtDecodedData,
    });

    const currentTime = Date.now() / 1000;
    if (jwtDecodedData.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/";
    }
  } catch (error) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />
          <Routes>
            {
              //private routes
            }
            <Route
              path='/dashboard'
              element={
                <SecureRoute>
                  <Dashboard />
                </SecureRoute>
              }
            />
            <Route
              path='/addproject'
              element={
                <SecureRoute>
                  <AddProject />
                </SecureRoute>
              }
            />
            <Route
              path='/updateproject/:projuid'
              element={
                <SecureRoute>
                  <UpdateProject />
                </SecureRoute>
              }
            />
            <Route
              path='/projectboard/:projuid'
              element={
                <SecureRoute>
                  <ProjectBoard />
                </SecureRoute>
              }
            />
            <Route
              path='/addprojecttask/:projuid'
              element={
                <SecureRoute>
                  <AddProjectTask />
                </SecureRoute>
              }
            />
            <Route
              path='/updateprojecttask/:projuid/:projseq'
              element={
                <SecureRoute>
                  <UpdateProjectTask />
                </SecureRoute>
              }
            />

            {
              //public routes
            }
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Landing />} />

            {
              //404 page not found
            }
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
