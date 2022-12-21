package com.randomcompany.ppmtool.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.randomcompany.ppmtool.models.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import static com.randomcompany.ppmtool.security.SecurityConstants.EXPIRATION_TIME;
import static com.randomcompany.ppmtool.security.SecurityConstants.SECRET;

@Component
public class JwtTokenProvider {
	
	
	//Generate a token
	public String generateToken(Authentication authentication) {
		User user  = (User) authentication.getPrincipal();
		
		Date now  = new Date(System.currentTimeMillis());
		Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);
		
		String userId = Long.toString(user.getId());
		
		Map<String, Object> claims = new HashMap<String, Object>();
		claims.put("id", userId);
		claims.put("username", user.getUsername());
		claims.put("fullname", user.getFullname());
		
		return Jwts.builder()
				.setSubject(userId)
				.setClaims(claims)
				.setIssuedAt(now)
				.setExpiration(expiryDate)
				.signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET)), SignatureAlgorithm.HS512)
				.compact();
	}
	
	
	//Validate a token
	
	
	//Get id from token
}
