import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addProjectTask } from "../../../actions/BacklogActions";

import { clearErrors } from "../../../actions/ErrorActions";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

const AddProjectTask = ({ errors, addProjectTask, clearErrors }) => {
  const { projuid } = useParams();
  const navigate = useNavigate();

  const [projectTask, setProjectTask] = useState({
    summary: "",
    acceptanceCriteria: "",
    dueDate: "",
    priority: "",
    status: "",
  });

  const [localErrors, setLocalErrors] = useState({});

  const { summary, acceptanceCriteria, dueDate, priority, status } =
    projectTask;

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setLocalErrors({
        ...errors,
      });
      clearErrors();
    }
  }, [errors]);

  const onChange = (e) => {
    setProjectTask({
      ...projectTask,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addProjectTask(projuid, projectTask, navigate);
  };

  return (
    <div className='add-PBI'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link to={`/projectboard/${projuid}`} className='btn btn-light'>
              Back to Project Board
            </Link>
            <h4 className='display-4 text-center'>Add Project Task</h4>
            <p className='lead text-center'>{`Project ID : ${projuid}`}</p>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": localErrors.summary,
                  })}
                  name='summary'
                  placeholder='Project Task summary'
                  onChange={onChange}
                />
                {localErrors.summary && (
                  <div className='invalid-feedback'>{localErrors.summary}</div>
                )}
              </div>
              <div className='form-group'>
                <textarea
                  className='form-control form-control-lg'
                  placeholder='Acceptance Criteria'
                  name='acceptanceCriteria'
                  onChange={onChange}
                ></textarea>
              </div>
              <h6>Due Date</h6>
              <div className='form-group'>
                <input
                  type='date'
                  className='form-control form-control-lg'
                  name='dueDate'
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <select
                  className='form-control form-control-lg'
                  name='priority'
                  onChange={onChange}
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className='form-group'>
                <select
                  className='form-control form-control-lg'
                  name='status'
                  onChange={onChange}
                >
                  <option value=''>Select Status</option>
                  <option value='TO_DO'>TO DO</option>
                  <option value='IN_PROGRESS'>IN PROGRESS</option>
                  <option value='DONE'>DONE</option>
                </select>
              </div>

              <input type='submit' className='btn btn-primary btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddProjectTask.propTypes = {
  addProjectTask: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { addProjectTask, clearErrors })(
  AddProjectTask
);
