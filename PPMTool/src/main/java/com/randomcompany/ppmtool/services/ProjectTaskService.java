package com.randomcompany.ppmtool.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.randomcompany.ppmtool.exceptions.ProjectNotFoundException;
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
	
	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
		try {
			Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
			
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
			
		} catch (Exception e) {
			throw new ProjectNotFoundException("project not found");
		}
	}

	public List<ProjectTask> findBacklogById(String projectIdentifier) {
		Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
		if(backlog == null) {
			throw new ProjectNotFoundException("project with project identifier '" + projectIdentifier + "' not found");
		}
		return backlog.getProjectTasks();
		
//			return projectTaskRepository.findAllByProjectIdentifier(projectIdentifier);
	}
	
	public ProjectTask findProjectTaskByPTSequence(String backlog_id, String pt_sequence) {
		
		Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
		if(backlog == null) {
			throw new ProjectNotFoundException("project not found");
		}
		
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_sequence);
		if(projectTask == null) {
			throw new ProjectNotFoundException("project task with sequence '" + pt_sequence + "' not found");
		}
		
		if(!projectTask.getProjectIdentifier().equals(backlog_id)) {
			throw new ProjectNotFoundException("project task with sequence '" + pt_sequence + "' does not exist in project '" + backlog_id + "'");
		}
		
		return projectTask;
	}
	
	public ProjectTask updateProjectTaskByProjectSequence(ProjectTask updatedProjectTask, String backlog_id, String pt_sequence) {
		
		ProjectTask identifiedProjectTask = findProjectTaskByPTSequence(backlog_id, pt_sequence);
		
		identifiedProjectTask = updatedProjectTask;
		
		return projectTaskRepository.save(identifiedProjectTask);
	}
	
	public void deleteProjectTaskByProjectSequence(String backlog_id, String pt_sequence) {
		ProjectTask identifiedProjectTask = findProjectTaskByPTSequence(backlog_id, pt_sequence);
		
		projectTaskRepository.delete(identifiedProjectTask);
	}
	
}
