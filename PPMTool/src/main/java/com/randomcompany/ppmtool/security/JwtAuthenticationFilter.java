package com.randomcompany.ppmtool.security;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.randomcompany.ppmtool.security.SecurityConstants.HEADER_STRING;
import static com.randomcompany.ppmtool.security.SecurityConstants.TOKEN_PREFIX;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.randomcompany.ppmtool.models.User;
import com.randomcompany.ppmtool.services.CustomUserDetailsService;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String jwtToken = getJwtTokenFromRequest(request);
			if(StringUtils.hasText(jwtToken) && jwtTokenProvider.validateToken(jwtToken)) {
				Long Id = jwtTokenProvider.getIdFromJwtToken(jwtToken);
				
				User user = customUserDetailsService.loadUserById(Id);
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						user, null, Collections.emptyList()
				);
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				SecurityContextHolder.getContext().setAuthentication(authentication);
				
			}
		} catch (Exception e) {
			logger.error("Could not set user authentication in security context", e);
		}
		
		
		filterChain.doFilter(request, response);
	}
	
	public String getJwtTokenFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader(HEADER_STRING);
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith(TOKEN_PREFIX)) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}
	
}
