package com.randomcompany.ppmtool.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

@Service
public class ErrorMapValidationService {
	public ResponseEntity<?> mapValidate(BindingResult result) {
		Map<String, String> errors = new HashMap<String, String>();
		result.getFieldErrors().stream().forEach(fe -> errors.put(fe.getField(), fe.getDefaultMessage()));
		
		if(result.hasErrors()) {
			return new ResponseEntity<Map<String, String>>(errors, HttpStatus.BAD_REQUEST);
		}
		return null;
	}
}
