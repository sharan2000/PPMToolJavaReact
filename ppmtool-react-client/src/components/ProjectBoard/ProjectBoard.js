import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Backlog from "./Backlog";
import { getBacklog, clearBacklog } from "../../actions/BacklogActions";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/ErrorActions";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

const ProjectBoard = ({
  errors,
  backlog,
  utils,
  clearBacklog,
  clearErrors,
  getBacklog,
}) => {
  const { projuid } = useParams();
  const { projectTasks, deleteTaskProjSeq } = backlog;
  const navigate = useNavigate();

  const [localErrors, setLocalErrors] = useState({});
  const [localProjectTasks, setLocalProjectTasks] = useState([]);

  let showAddButton = true;

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setLocalErrors(errors);
      clearErrors();
    }
  }, [errors]);

  useEffect(() => {
    if (projectTasks.length > 0) {
      setLocalProjectTasks(projectTasks);
      clearBacklog();
    }
  }, [projectTasks]);

  useEffect(() => {
    setLocalProjectTasks(
      localProjectTasks.filter(
        (projTask) => projTask.projectSequence != deleteTaskProjSeq
      )
    );
  }, [deleteTaskProjSeq]);

  useEffect(() => {
    getBacklog(projuid, navigate);
  }, []);

  const projectBoardAlgo = (localErrors, localProjectTasks) => {
    if (localProjectTasks.length < 1) {
      if (localErrors.projectNotFound) {
        showAddButton = false;
        return (
          <div className='alert alert-danger text-center' role='alert'>
            {localErrors.projectNotFound}
          </div>
        );
      } else if (localErrors.projectIdentifier) {
        showAddButton = false;
        return (
          <div className='alert alert-danger text-center' role='alert'>
            {localErrors.projectIdentifier}
          </div>
        );
      } else {
        return (
          <div className='alert alert-danger text-center' role='alert'>
            No project tasks on this board
          </div>
        );
      }
    } else {
      return <Backlog projectTasks={localProjectTasks} />;
    }
  };

  let backlogBoard = projectBoardAlgo(localErrors, localProjectTasks);
  return (
    <div className='container'>
      {showAddButton && (
        <Fragment>
          <Link
            to={`/addprojecttask/${projuid}`}
            className='btn btn-primary mb-3'
          >
            <i className='fas fa-plus-circle'> Create Project Task</i>
          </Link>
          <br />
          <hr />
        </Fragment>
      )}
      {utils.isLoading ? <Spinner /> : backlogBoard}
    </div>
  );
};

ProjectBoard.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  backlog: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  clearBacklog: PropTypes.func.isRequired,
  utils: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
  errors: state.errors,
  utils: state.utils,
});

export default connect(mapStateToProps, {
  clearBacklog,
  clearErrors,
  getBacklog,
})(ProjectBoard);
