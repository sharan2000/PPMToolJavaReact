import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/ProjectActions";

const ProjectItem = ({ project, deleteProject }) => {
  const onDeleteClick = () => {
    if (window.confirm("confirm to delete the project and its contents")) {
      deleteProject(project.projectIdentifier);
    }
  };

  return (
    <div className='container'>
      <div className='card card-body bg-light mb-3'>
        <div className='row'>
          <div className='col-2'>
            <span className='mx-auto'>{project.projectIdentifier}</span>
          </div>
          <div className='col-lg-6 col-md-4 col-8'>
            <h3>{project.projectName}</h3>
            <p>{project.description}</p>
          </div>
          <div className='col-md-4 d-none d-lg-block'>
            <ul className='list-group'>
              <Link
                to={`/projectboard/${project.projectIdentifier}`}
                style={anchorcss}
              >
                <li className='list-group-item board'>
                  <span>
                    <i className='fa fa-flag-checkered pr-1'></i>Project Board{" "}
                  </span>
                </li>
              </Link>
              <Link
                to={`/updateproject/${project.projectIdentifier}`}
                style={anchorcss}
              >
                <li className='list-group-item update'>
                  <i className='fa fa-edit pr-1'></i>Update Project Info{" "}
                </li>
              </Link>
              <li className='list-group-item delete' onClick={onDeleteClick}>
                <span>
                  <i className='fa fa-minus-circle pr-1'></i>Delete Project
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const anchorcss = { textDecoration: "none" };

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(ProjectItem);
