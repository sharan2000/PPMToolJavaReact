import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { clearErrors } from "../../../actions/ErrorActions";
import classnames from "classnames";
import {
  getProjectTask,
  clearProjectTask,
  updateProjectTask,
} from "../../../actions/BacklogActions";
import PropTypes from "prop-types";

const UpdateProjectTask = ({
  backlog: { projectTask },
  errors,
  clearErrors,
  getProjectTask,
  clearProjectTask,
  updateProjectTask,
}) => {
  const { projuid, projseq } = useParams();

  const navigate = useNavigate();

  const [localProjectTask, setLocalProjectTask] = useState({
    id: "",
    summary: "",
    acceptanceCriteria: "",
    dueDate: "",
    priority: "",
    status: "",
  });

  const [localErrors, setLocalErrors] = useState({});

  const { summary, acceptanceCriteria, dueDate, priority, status } =
    localProjectTask;

  useEffect(() => {
    getProjectTask(projuid, projseq, navigate);
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setLocalErrors(errors);
      clearErrors();
    }
  }, [errors]);

  useEffect(() => {
    if (Object.keys(projectTask).length > 0) {
      setLocalProjectTask({
        id: projectTask.id || "",
        summary: projectTask.summary || "",
        acceptanceCriteria: projectTask.acceptanceCriteria || "",
        dueDate: projectTask.dueDate || "",
        priority: projectTask.priority || "",
        status: projectTask.status || "",
      });
      clearProjectTask();
    }
  }, [projectTask]);

  const onChange = (e) => {
    setLocalProjectTask({
      ...localProjectTask,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateProjectTask(projuid, projseq, localProjectTask, navigate);
  };

  return (
    <div className='add-PBI'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link to={`/projectboard/${projuid}`} className='btn btn-light'>
              Back to Project Board
            </Link>
            <h4 className='display-4 text-center'>Update Project Task</h4>
            <p className='lead text-center'>{`Project ID : ${projuid} | Project Sequence : ${projseq}`}</p>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": localErrors.summary,
                  })}
                  name='summary'
                  value={summary}
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
                  value={acceptanceCriteria}
                  onChange={onChange}
                ></textarea>
              </div>
              <h6>Due Date</h6>
              <div className='form-group'>
                <input
                  type='date'
                  className='form-control form-control-lg'
                  name='dueDate'
                  value={dueDate}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <select
                  className='form-control form-control-lg'
                  name='priority'
                  value={priority}
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
                  value={status}
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

UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  clearProjectTask: PropTypes.func.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  backlog: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getProjectTask,
  clearProjectTask,
  updateProjectTask,
  clearErrors,
})(UpdateProjectTask);
