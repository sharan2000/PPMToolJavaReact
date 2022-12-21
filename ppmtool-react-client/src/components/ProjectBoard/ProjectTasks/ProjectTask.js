import React from "react";
import { Link } from "react-router-dom";
import { deleteProjectTask } from "../../../actions/BacklogActions";
import { connect } from "react-redux/es/exports";
import PropTypes from "prop-types";

const ProjectTask = ({ projectTask, deleteProjectTask }) => {
  let priorityClass;
  let priorityString;

  if (projectTask.priority === 1) {
    priorityClass = "bg-danger text-light";
    priorityString = "HIGH";
  } else if (projectTask.priority === 2) {
    priorityClass = "bg-warning text-light";
    priorityString = "MEDIUM";
  } else {
    priorityClass = "bg-info text-light";
    priorityString = "LOW";
  }

  const onDelete = (e) => {
    if (
      window.confirm(
        `confirm to delete project task with project sequence ${projectTask.projectSequence}`
      )
    ) {
      deleteProjectTask(
        projectTask.projectIdentifier,
        projectTask.projectSequence
      );
    }
  };

  return (
    <div className='card mb-1 bg-light'>
      <div className={`card-header text-primary ${priorityClass}`}>
        ID: {projectTask.projectSequence} -- Priority: {priorityString}
      </div>
      <div className='card-body bg-light'>
        <h5 className='card-title'>{projectTask.summary}</h5>
        <p className='card-text text-truncate '>
          {projectTask.acceptanceCriteria}
        </p>
        <Link
          to={`/updateprojecttask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`}
          className='btn btn-primary'
        >
          View / Update
        </Link>

        <button className='btn btn-danger ml-4' onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

ProjectTask.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired,
};

export default connect(null, { deleteProjectTask })(ProjectTask);
