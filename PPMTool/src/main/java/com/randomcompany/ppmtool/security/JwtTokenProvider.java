package com.randomcompany.ppmtool.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.randomcompany.ppmtool.models.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.InvalidKeyException;
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
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET))).build().parseClaimsJws(token);
			return true;
		} catch (MalformedJwtException ex) {
			System.out.println("Invalid jwt token");
		} catch (ExpiredJwtException ex) {
			System.out.println("Expired jwt token");
		} catch (UnsupportedJwtException ex) {
			System.out.println("Unsupported jwt token");
		} catch (IllegalArgumentException ex) {
			System.out.println("Jwt claims string is empty");
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		return false;
	}
	
	
	//Get id from token
	public Long getIdFromJwtToken(String token) {
		Claims claims = Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET))).build().parseClaimsJws(token).getBody();
		Long id = Long.parseLong(claims.get("id").toString());
		return id;
	}
	
	
	
}
