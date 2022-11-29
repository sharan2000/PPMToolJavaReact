import React, { useState } from "react";

const AddProject = () => {
  const [project, setProject] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const { projectName, projectIdentifier, description, startDate, endDate } =
    project;

  const onChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(project);
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
                  className='form-control form-control-lg '
                  placeholder='Project Name'
                  name='projectName'
                  value={projectName}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control form-control-lg'
                  placeholder='Unique Project ID'
                  name='projectIdentifier'
                  value={projectIdentifier}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <textarea
                  className='form-control form-control-lg'
                  placeholder='Project Description'
                  name='description'
                  value={description}
                  onChange={onChange}
                ></textarea>
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

export default AddProject;
