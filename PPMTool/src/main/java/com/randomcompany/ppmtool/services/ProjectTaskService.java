package com.randomcompany.ppmtool.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.randomcompany.ppmtool.exceptions.ProjectNotFoundException;
import com.randomcompany.ppmtool.exceptions.ProjectTaskRelatedException;
import com.randomcompany.ppmtool.models.Backlog;
import com.randomcompany.ppmtool.models.ProjectTask;
import com.randomcompany.ppmtool.repositories.BacklogRepository;
import com.randomcompany.ppmtool.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {
	
	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private ProjectService projectService;
	
	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {

			Backlog backlog = projectService.getProjectByIdentifier(projectIdentifier, username).getBacklog();
			
			projectTask.setBacklog(backlog);
			projectTask.setProjectIdentifier(projectIdentifier);
			Integer projSequenceNumber = backlog.getPTSequence();
			projSequenceNumber++;
			projectTask.setProjectSequence(projectIdentifier + "-" + projSequenceNumber);
			
			if(projectTask.getPriority() == null || projectTask.getPriority() == 0) {
				projectTask.setPriority(3);
			}
			
			if(projectTask.getStatus() == null || projectTask.getStatus() == "") {
				projectTask.setStatus("TO_DO");
			}
			
			backlog.setPTSequence(projSequenceNumber);
			
			return projectTaskRepository.save(projectTask);

	}

	public List<ProjectTask> findBacklogById(String projectIdentifier, String username) {
		projectService.getProjectByIdentifier(projectIdentifier, username);
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
	}
	
	public ProjectTask findProjectTaskByPTSequence(String backlog_id, String pt_sequence, String username) {
		backlog_id = backlog_id.toUpperCase();
		pt_sequence = pt_sequence.toUpperCase();
		
		projectService.getProjectByIdentifier(backlog_id, username);
		
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_sequence);
		if(projectTask == null) {
			throw new ProjectNotFoundException("project task with sequence '" + pt_sequence + "' not found");
		}
		
		if(!projectTask.getProjectIdentifier().equals(backlog_id)) {
			throw new ProjectNotFoundException("project task with sequence '" + pt_sequence + "' does not exist in project '" + backlog_id + "'");
		}
		
		return projectTask;
	}
	
	public ProjectTask updateProjectTaskByProjectSequence(ProjectTask updatedProjectTask, String backlog_id, String pt_sequence, String username) {
		
		ProjectTask identifiedProjectTask = findProjectTaskByPTSequence(backlog_id, pt_sequence, username);
		
		if(identifiedProjectTask.getId() != updatedProjectTask.getId()) {
			throw new ProjectTaskRelatedException("Project task could not be updated");
		}
		
		return projectTaskRepository.save(updatedProjectTask);
	}
	
	public void deleteProjectTaskByProjectSequence(String backlog_id, String pt_sequence, String username) {
		ProjectTask identifiedProjectTask = findProjectTaskByPTSequence(backlog_id, pt_sequence, username);
		projectTaskRepository.delete(identifiedProjectTask);
	}
	
}
