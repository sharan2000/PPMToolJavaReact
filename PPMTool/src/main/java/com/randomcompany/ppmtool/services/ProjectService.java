package com.randomcompany.ppmtool.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.randomcompany.ppmtool.exceptions.ProjectIdException;
import com.randomcompany.ppmtool.models.Backlog;
import com.randomcompany.ppmtool.models.Project;
import com.randomcompany.ppmtool.repositories.BacklogRepository;
import com.randomcompany.ppmtool.repositories.ProjectRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	
	public Project saveOrUpdateProject(Project project) {
		String projectIdentifier = project.getProjectIdentifier().toUpperCase();
		try {
			project.setProjectIdentifier(projectIdentifier);
			
			if(project.getId() == null) {
				Backlog backlog = new Backlog();
				project.setBacklog(backlog);
				backlog.setProject(project);
				backlog.setProjectIdentifier(projectIdentifier);
			}
			if(project.getId() != null) {
				project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
				
			}
			
			
			return projectRepository.save(project);
		}
		catch(Exception e) {
			throw new ProjectIdException("The project identifier '" + project.getProjectIdentifier() + "' already exists");
		}
	}
	
	public Project getProjectByIdentifier(String projectId) {
		Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
		if(project == null) {
			throw new ProjectIdException("The project identifier '" + projectId + "' does not exist");
		}
		return project;
	}
	
	public List<Project> findAllProjects() {
		return projectRepository.findAll();
	}
	
	public void deleteProjectByIdentifier(String projectId) {
		Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
		
		if(project == null) {
			throw new ProjectIdException("Cannot delete project with identifier '" + projectId + "' it does not exist");
		}
		projectRepository.delete(project);
	}
	
}
