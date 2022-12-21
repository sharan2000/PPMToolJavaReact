package com.randomcompany.ppmtool.web;

import javax.validation.Valid;

import static com.randomcompany.ppmtool.security.SecurityConstants.TOKEN_PREFIX;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.randomcompany.ppmtool.models.User;
import com.randomcompany.ppmtool.payload.LoginRequest;
import com.randomcompany.ppmtool.payload.LoginSuccessResponse;
import com.randomcompany.ppmtool.security.JwtTokenProvider;
import com.randomcompany.ppmtool.services.ErrorMapValidationService;
import com.randomcompany.ppmtool.services.UserService;
import com.randomcompany.ppmtool.validator.UserValidator;

@RestController
@RequestMapping(path = "/api/users")
public class UserController {
	
	@Autowired
	private ErrorMapValidationService errorMapValidationService;
	
	@Autowired
	private UserValidator userValidator;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping(path = "/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
		userValidator.validate(user, result);
		
		ResponseEntity<?> errorsMap = errorMapValidationService.mapValidate(result);
		if(errorsMap != null) return errorsMap;
		
		User newUser = userService.saveUser(user);
		return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
	}
	
	
	@PostMapping(path = "/login")
	public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
		ResponseEntity<?> errorsMap = errorMapValidationService.mapValidate(result);
		if(errorsMap != null) return errorsMap;
		
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
		);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String jwtToken = TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);
		
		return new ResponseEntity<LoginSuccessResponse>(new LoginSuccessResponse(true, jwtToken), HttpStatus.OK);
	}
	
}
