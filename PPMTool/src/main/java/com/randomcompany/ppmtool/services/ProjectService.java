package com.randomcompany.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.randomcompany.ppmtool.models.Project;
import com.randomcompany.ppmtool.repositories.ProjectRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	
	public Project saveOrUpdateProject(Project project) {
		return projectRepository.save(project);
	}
	
}
