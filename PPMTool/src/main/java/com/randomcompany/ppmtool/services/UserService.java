package com.randomcompany.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.randomcompany.ppmtool.exceptions.UsernameAlreadyExistsException;
import com.randomcompany.ppmtool.models.User;
import com.randomcompany.ppmtool.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	public User saveUser(User user) {
		try {
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			user.setConfirmPassword("");
			return userRepository.save(user);
		} catch (Exception e) {
			throw new UsernameAlreadyExistsException("username '" + user.getUsername() + "' already exists");
		}
	}
	
}
