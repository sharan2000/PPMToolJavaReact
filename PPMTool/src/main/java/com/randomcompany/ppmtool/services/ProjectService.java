package com.randomcompany.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.randomcompany.ppmtool.exceptions.ProjectIdException;
import com.randomcompany.ppmtool.models.Project;
import com.randomcompany.ppmtool.repositories.ProjectRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	
	public Project saveOrUpdateProject(Project project) {
		try {
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
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
	
}
