import React from "react";

const ProjectItem = () => {
  return (
    <div className='container'>
      <div className='card card-body bg-light mb-3'>
        <div className='row'>
          <div className='col-2'>
            <span className='mx-auto'>REACT</span>
          </div>
          <div className='col-lg-6 col-md-4 col-8'>
            <h3>Spring / React Project</h3>
            <p>Project to create a Kanban Board with Spring Boot and React</p>
          </div>
          <div className='col-md-4 d-none d-lg-block'>
            <ul className='list-group'>
              <a href='#' style={anchorcss}>
                <li className='list-group-item board'>
                  <span>
                    <i className='fa fa-flag-checkered pr-1'></i>Project Board{" "}
                  </span>
                </li>
              </a>
              <a href='#' style={anchorcss}>
                <li className='list-group-item update'>
                  <i className='fa fa-edit pr-1'></i>Update Project Info{" "}
                </li>
              </a>
              <a href='' style={anchorcss}>
                <li className='list-group-item delete'>
                  <span>
                    <i className='fa fa-minus-circle pr-1'></i>Delete Project
                  </span>
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const anchorcss = { textDecoration: "none" };

export default ProjectItem;
