package com.randomcompany.ppmtool.web;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.randomcompany.ppmtool.models.ProjectTask;
import com.randomcompany.ppmtool.services.ErrorMapValidationService;
import com.randomcompany.ppmtool.services.ProjectTaskService;

@RestController
@RequestMapping(path = "/api/backlog")
@CrossOrigin
public class BacklogController {
	
	@Autowired
	private ProjectTaskService projectTaskService;
	
	@Autowired
	private ErrorMapValidationService errorMapValidationService;
	
	@PostMapping(path = "/{backlog_id}")
	public ResponseEntity<?> addProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,@PathVariable String backlog_id) {
		ResponseEntity<?> errorMap = errorMapValidationService.mapValidate(result);
		if(errorMap != null) {
			return errorMap;
		}
		
		ProjectTask resProjectTask = projectTaskService.addProjectTask(backlog_id, projectTask);
		return new ResponseEntity<ProjectTask>(resProjectTask, HttpStatus.CREATED);
	}
	
	@GetMapping(path = "/{backlog_id}")
	public List<ProjectTask> getProjectBacklog(@PathVariable String backlog_id) {
		return projectTaskService.findBacklogById(backlog_id);
	}
	
	@GetMapping(path = "/{backlog_id}/{project_sequence}")
	public ResponseEntity<ProjectTask> getProjectTaskByPTSequence(@PathVariable String backlog_id, @PathVariable String project_sequence) {
		ProjectTask projectTask = projectTaskService.findProjectTaskByPTSequence(backlog_id, project_sequence);
		return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
	}
	
	@PutMapping(path = "/{backlog_id}/{project_sequence}")
	public ResponseEntity<?> updateProjectByPTSequence(@Valid @RequestBody ProjectTask updatedProjectTask, BindingResult result, @PathVariable String backlog_id, @PathVariable String project_sequence) {
		ResponseEntity<?> errorsMap = errorMapValidationService.mapValidate(result);
		if(errorsMap != null) {
			return errorsMap;
		}
		
		ProjectTask projectTask = projectTaskService.updateProjectTaskByProjectSequence(updatedProjectTask, backlog_id, project_sequence);
		
		return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
	}
	
	
	@DeleteMapping(path = "/{backlog_id}/{project_sequence}")
	public ResponseEntity<?> deleteProjectByPTSequence(@PathVariable String backlog_id, @PathVariable String project_sequence) {
		projectTaskService.deleteProjectTaskByProjectSequence(backlog_id, project_sequence);
		
		return new ResponseEntity<String>("project task deleted successfully", HttpStatus.OK); 
	}

}
