package com.randomcompany.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler
	public final ResponseEntity<Object> handleProjectIdException(ProjectIdException exception, WebRequest request)  {
		ProjectIdExceptionResponse response = new ProjectIdExceptionResponse(exception.getMessage());
		return new ResponseEntity<Object>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler
	public final ResponseEntity<Object> handleProjectNotFoundException(ProjectNotFoundException exception, WebRequest request)  {
		ProjectNotFoundExceptionResponse response = new ProjectNotFoundExceptionResponse(exception.getMessage());
		return new ResponseEntity<Object>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler
	public final ResponseEntity<Object> handleUsernameAlreadyExistsException(UsernameAlreadyExistsException exception,  WebRequest request) {
		UsernameAlreadyExistsResponse usernameAlreadyExistsResponse = new UsernameAlreadyExistsResponse(exception.getMessage());
		return new ResponseEntity<Object>(usernameAlreadyExistsResponse, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler
	public final ResponseEntity<Object> handleProjectTaskRelatedException(ProjectTaskRelatedException exception,  WebRequest request) {
		ProjectTaskRelatedExceptionResponse projectTaskRelatedExceptionResponse = new ProjectTaskRelatedExceptionResponse(exception.getMessage());
		return new ResponseEntity<Object>(projectTaskRelatedExceptionResponse, HttpStatus.BAD_REQUEST);
	}
}
