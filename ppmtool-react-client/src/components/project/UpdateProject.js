import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";

import { clearErrors } from "../../actions/ErrorActions";

import {
  createProject,
  getProjectById,
  clearProject,
} from "../../actions/ProjectActions";

import PropTypes from "prop-types";

const UpdateProject = ({
  projectsState: { project },
  clearProject,
  errors,
  createProject,
  getProjectById,
  clearErrors,
}) => {
  const { projuid } = useParams();
  const navigate = useNavigate();

  const [tempProject, setTempProject] = useState({
    id: "",
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const { projectName, projectIdentifier, description, startDate, endDate } =
    tempProject;

  useEffect(() => {
    getProjectById(projuid, navigate);
  }, []);

  useEffect(() => {
    if (Object.keys(project).length > 0) {
      setTempProject({
        id: project.id || "",
        projectName: project.projectName || "",
        projectIdentifier: project.projectIdentifier || "",
        description: project.description || "",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
      });
      clearProject();
    }
  }, [project]);

  const [localErrors, setLocalErrors] = useState({});
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setLocalErrors({
        ...errors,
      });
      clearErrors();
    }
  }, [errors]);

  const onChange = (e) => {
    setTempProject({
      ...tempProject,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProject(tempProject, navigate);
  };

  return (
    <div>
      <div className='project'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h5 className='display-4 text-center'>Edit Project form</h5>
              <hr />
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <input
                    onChange={onChange}
                    name='projectName'
                    value={projectName}
                    type='text'
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": localErrors.projectName,
                    })}
                    placeholder='Project Name'
                  />
                  {localErrors.projectName && (
                    <div className='invalid-feedback'>
                      {localErrors.projectName}
                    </div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    name='projectIdentifier'
                    value={projectIdentifier}
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Unique Project ID'
                    disabled
                  />
                </div>
                <div className='form-group'>
                  <textarea
                    onChange={onChange}
                    name='description'
                    value={description}
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": localErrors.description,
                    })}
                    placeholder='Project Description'
                  ></textarea>
                  {localErrors.description && (
                    <div className='invalid-feedback'>
                      {localErrors.description}
                    </div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className='form-group'>
                  <input
                    onChange={onChange}
                    name='startDate'
                    value={startDate}
                    type='date'
                    className='form-control form-control-lg'
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className='form-group'>
                  <input
                    onChange={onChange}
                    name='endDate'
                    value={endDate}
                    type='date'
                    className='form-control form-control-lg'
                  />
                </div>

                <input
                  type='submit'
                  className='btn btn-primary btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateProject.propTypes = {
  getProjectById: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  projectsState: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projectsState: state.projects,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  createProject,
  clearProject,
  getProjectById,
  clearErrors,
})(UpdateProject);
