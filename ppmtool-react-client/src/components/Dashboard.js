import React from "react";
import ProjectItem from "./project/ProjectItem";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className='projects'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='display-4 text-center'>Projects</h1>
            <br />
            <Link to='/addproject' className='btn btn-lg btn-info'>
              Create a Project
            </Link>
            <br />
            <hr />

            <ProjectItem />
            <ProjectItem />
            <ProjectItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
