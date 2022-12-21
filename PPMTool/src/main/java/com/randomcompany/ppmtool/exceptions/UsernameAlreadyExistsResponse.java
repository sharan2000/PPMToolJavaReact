package com.randomcompany.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class UsernameAlreadyExistsResponse {
	private String username;
	
	public UsernameAlreadyExistsResponse(String message) {
		this.username = message;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
