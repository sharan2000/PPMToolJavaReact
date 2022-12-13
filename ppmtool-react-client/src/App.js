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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/addproject' element={<AddProject />} />
            <Route path='/updateproject/:projuid' element={<UpdateProject />} />
            <Route path='/projectboard/:projuid' element={<ProjectBoard />} />
            <Route
              path='/addprojecttask/:projuid'
              element={<AddProjectTask />}
            />
            <Route
              path='/updateprojecttask/:projuid/:projseq'
              element={<UpdateProjectTask />}
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
