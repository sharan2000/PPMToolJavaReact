package com.randomcompany.ppmtool.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.randomcompany.ppmtool.services.CustomUserDetailsService;

import static com.randomcompany.ppmtool.security.SecurityConstants.SIGN_UP_URLS;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		jsr250Enabled = true,
		prePostEnabled = true,
		securedEnabled = true
)
public class SecurityConfig {
	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;
	
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
	
	/*
	 We don't have to add our CustomUserDetailsService to the AuthenticationManagerBuilder. Since we are using
	 spring boot which uses spring it has a main feature of dependency injection it will inject the dependencies where ever
	 they are needed. Since our CustomUserDetailsService is a Component it will be managed by spring. The CustomUserDetailsService
	 also implements UserDetailsService so the "CustomUserDetailsService" call will automatically be added to the AuthenticationManagerBuilder
	 saying that to use our CustomUserDetailsService because it implements UserDetailsService. It is made as the default UserDetailsService.
	 
	 We stored our passwords in encrypted form using bcrypt. So we need to make BCryptPasswordEncoder a bean.
	 It will automatically be picked up by spring, since it is a PasswordEncoder and is a bean so spring will add the
	 "BCryptPasswordEncoder" as the default password encoder.
	*/
	
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()
			.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			.authorizeRequests()
			.antMatchers(
					"/",
                    "/favicon.ico",
                    "/**/*.png",
                    "/**/*.gif",
                    "/**/*.svg",
                    "/**/*.jpg",
                    "/**/*.html",
                    "/**/*.css",
                    "/**/*.js"
			).permitAll()
			.antMatchers(SIGN_UP_URLS).permitAll()
			.anyRequest().authenticated();
		
		return http.build();
	}
}
