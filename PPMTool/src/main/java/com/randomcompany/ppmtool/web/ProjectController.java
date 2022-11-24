package com.randomcompany.ppmtool.web;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.randomcompany.ppmtool.models.Project;
import com.randomcompany.ppmtool.services.ErrorMapValidationService;
import com.randomcompany.ppmtool.services.ProjectService;

@RestController
@RequestMapping(path = "/api/project")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private ErrorMapValidationService errorMapValidationService;
	
	@PostMapping(path = "")
	public ResponseEntity<?> createNewProject (@Valid @RequestBody Project project, BindingResult result) {
		ResponseEntity<?> errorsMap  =  errorMapValidationService.mapValidate(result);
		if(errorsMap != null) return errorsMap;
		
		Project res = projectService.saveOrUpdateProject(project);
		
		return new ResponseEntity<Project>(res, HttpStatus.CREATED);
	}
	
	@GetMapping("/{projectId}")
	public ResponseEntity<Project> findProjectById(@PathVariable String projectId) {
		Project project = projectService.getProjectByIdentifier(projectId);
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}
	
}
