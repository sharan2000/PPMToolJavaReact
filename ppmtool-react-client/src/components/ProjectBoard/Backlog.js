import React from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";

const Backlog = ({ projectTasks }) => {
  let toDoList = [];
  let inProgressList = [];
  let doneList = [];

  projectTasks.forEach((task) => {
    const eleProjTask = <ProjectTask key={task.id} projectTask={task} />;
    if (task.status == "TO_DO") {
      toDoList.push(eleProjTask);
    } else if (task.status == "IN_PROGRESS") {
      inProgressList.push(eleProjTask);
    } else {
      doneList.push(eleProjTask);
    }
  });

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-4'>
          <div className='card text-center mb-2'>
            <div className='card-header bg-secondary text-white'>
              <h3>TO DO</h3>
            </div>
          </div>

          {toDoList}
        </div>
        <div className='col-md-4'>
          <div className='card text-center mb-2'>
            <div className='card-header bg-primary text-white'>
              <h3>In Progress</h3>
            </div>
          </div>
          {inProgressList}
        </div>
        <div className='col-md-4'>
          <div className='card text-center mb-2'>
            <div className='card-header bg-success text-white'>
              <h3>Done</h3>
            </div>
          </div>
          {doneList}
        </div>
      </div>
    </div>
  );
};

export default Backlog;
