package com.randomcompany.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


public class ProjectIdExceptionResponse {
	
	private String projectIdentifier;
	
	public ProjectIdExceptionResponse(String message) {
		this.projectIdentifier = message;
	}

	public String getProjectIdentifier() {
		return projectIdentifier;
	}
}
