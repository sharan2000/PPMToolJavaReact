package com.randomcompany.ppmtool.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.randomcompany.ppmtool.models.Project;
import com.randomcompany.ppmtool.services.ProjectService;

@RestController
@RequestMapping(path = "/api/project")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@PostMapping(path = "")
	public ResponseEntity<Project> createNewProject (@RequestBody Project project) {
		Project res = projectService.saveOrUpdateProject(project);
		
		return new ResponseEntity<Project>(res, HttpStatus.CREATED);
	}
	
}
