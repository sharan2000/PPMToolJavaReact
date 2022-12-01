import React, { useEffect, useState } from "react";
import { createProject } from "../../actions/ProjectActions";

import classnames from "classnames";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddProject = ({ projects: { errors }, createProject }) => {
  const [project, setProject] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  const { projectName, projectIdentifier, description, startDate, endDate } =
    project;

  const onChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProject(project, navigate);
  };

  return (
    <div className='project'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h5 className='display-4 text-center'>
              Create / Edit Project form
            </h5>
            <hr />
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": errors.projectName,
                  })}
                  placeholder='Project Name'
                  name='projectName'
                  value={projectName}
                  onChange={onChange}
                />
                {errors.projectName && (
                  <div className='invalid-feedback'>{errors.projectName}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": errors.projectIdentifier,
                  })}
                  placeholder='Unique Project ID'
                  name='projectIdentifier'
                  value={projectIdentifier}
                  onChange={onChange}
                />
                {errors.projectIdentifier && (
                  <div className='invalid-feedback'>
                    {errors.projectIdentifier}
                  </div>
                )}
              </div>
              <div className='form-group'>
                <textarea
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": errors.description,
                  })}
                  placeholder='Project Description'
                  name='description'
                  value={description}
                  onChange={onChange}
                ></textarea>
                {errors.description && (
                  <div className='invalid-feedback'>{errors.description}</div>
                )}
              </div>
              <h6>Start Date</h6>
              <div className='form-group'>
                <input
                  type='date'
                  className='form-control form-control-lg'
                  name='startDate'
                  value={startDate}
                  onChange={onChange}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className='form-group'>
                <input
                  type='date'
                  className='form-control form-control-lg'
                  name='endDate'
                  value={endDate}
                  onChange={onChange}
                />
              </div>

              <input type='submit' className='btn btn-primary btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});
export default connect(mapStateToProps, { createProject })(AddProject);
