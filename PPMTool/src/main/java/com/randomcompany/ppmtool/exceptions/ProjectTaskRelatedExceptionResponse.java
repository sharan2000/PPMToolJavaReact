package com.randomcompany.ppmtool.exceptions;

public class ProjectTaskRelatedExceptionResponse {
	private String projectTaskError;

	public ProjectTaskRelatedExceptionResponse(String projectTaskError) {
		this.projectTaskError = projectTaskError;
	}

	public String getProjectTaskError() {
		return projectTaskError;
	}

	public void setProjectTaskError(String projectTaskError) {
		this.projectTaskError = projectTaskError;
	}
}
