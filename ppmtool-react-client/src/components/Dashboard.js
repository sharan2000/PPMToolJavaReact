import React, { useEffect } from "react";
import ProjectItem from "./project/ProjectItem";
import { Link } from "react-router-dom";
import { getAllProjects } from "../actions/ProjectActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Dashboard = ({ projectsState: { projects }, getAllProjects }) => {
  useEffect(() => {
    getAllProjects();
  }, []);

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

Dashboard.propTypes = {
  getAllProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projectsState: state.projects,
});

export default connect(mapStateToProps, { getAllProjects })(Dashboard);
