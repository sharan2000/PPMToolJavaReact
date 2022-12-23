package com.randomcompany.ppmtool.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.randomcompany.ppmtool.exceptions.ProjectIdException;
import com.randomcompany.ppmtool.exceptions.ProjectNotFoundException;
import com.randomcompany.ppmtool.models.Backlog;
import com.randomcompany.ppmtool.models.Project;
import com.randomcompany.ppmtool.models.User;
import com.randomcompany.ppmtool.repositories.BacklogRepository;
import com.randomcompany.ppmtool.repositories.ProjectRepository;
import com.randomcompany.ppmtool.repositories.UserRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	public Project saveOrUpdateProject(Project project, String username) {
		String projectIdentifier = project.getProjectIdentifier().toUpperCase();
		
		if(project.getId() != null) {
			Project existingProject = projectRepository.findByProjectIdentifier(projectIdentifier);
			
			if(existingProject != null && (!existingProject.getProjectLeader().equals(username))) {
				throw new ProjectNotFoundException("Project not found in your account");
			} else if(existingProject == null) {
				throw new ProjectNotFoundException("Project not updated because project with identifier : '" + projectIdentifier + "' doesn't exist");
			} else if(existingProject.getId() != project.getId()) {
				throw new ProjectNotFoundException("Project could not be updated");
			}
		}
		
		try {
			User user = userRepository.findByUsername(username);
			
			project.setUser(user);
			project.setProjectLeader(user.getUsername());
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
	
	public Project getProjectByIdentifier(String projectId, String username) {
		
		Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
		if(project == null) {
			throw new ProjectIdException("The project identifier '" + projectId + "' does not exist");
		}
		if(!project.getProjectLeader().equals(username)) {
			throw new ProjectNotFoundException("Project not found in your account");
		}
		
		return project;
	}
	
	public List<Project> findAllProjects(String username) {
		return projectRepository.findByProjectLeader(username);
	}
	
	public void deleteProjectByIdentifier(String projectId, String username) {
		Project project = getProjectByIdentifier(projectId, username);
		projectRepository.delete(project);
	}
	
}
