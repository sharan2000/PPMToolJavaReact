package com.randomcompany.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.randomcompany.ppmtool.models.User;
import com.randomcompany.ppmtool.repositories.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		
		if(user == null) throw new UsernameNotFoundException("username not found");
		return user;
	}
	
	@Transactional
	public User loadUserById(Long Id) {
		User user = userRepository.getById(Id);
		
		if(user == null) throw new UsernameNotFoundException("username not found");
		user.getUsername(); // should use the user object at least once or else throws 'org.hibernate.LazyInitializationException: could not initialize proxy [com.randomcompany.ppmtool.models.User#1] - no Session'. Don't know the cause for this strange behavior"
		return user;
	}

}
