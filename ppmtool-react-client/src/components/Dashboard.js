import React, { Fragment, useEffect } from "react";
import ProjectItem from "./project/ProjectItem";
import { Link } from "react-router-dom";
import { getAllProjects } from "../actions/ProjectActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "./layout/Spinner";

const Dashboard = ({ projectsState: { projects }, utils, getAllProjects }) => {
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
            {utils.isLoading ? (
              <Spinner />
            ) : (
              <Fragment>
                {projects.length > 0 &&
                  projects.map((project) => (
                    <ProjectItem project={project} key={project.id} />
                  ))}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getAllProjects: PropTypes.func.isRequired,
  projectsState: PropTypes.object.isRequired,
  utils: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  projectsState: state.projects,
  utils: state.utils,
});

export default connect(mapStateToProps, { getAllProjects })(Dashboard);
