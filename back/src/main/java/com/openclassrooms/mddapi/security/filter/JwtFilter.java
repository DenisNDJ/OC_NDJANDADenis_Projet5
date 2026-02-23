package com.openclassrooms.mddapi.security.filter;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.openclassrooms.mddapi.models.Users;
import com.openclassrooms.mddapi.services.UserService;
import com.openclassrooms.mddapi.services.jwtToken.JWTService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter{

	@Autowired
	private JWTService jwtService;
	@Autowired
	private UserService userService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String authHeader = request.getHeader("Authorization");
		String token=null;
		Long userId=null;
		
		if(authHeader != null && authHeader.startsWith("Bearer ")) {
			token = authHeader.substring(7);
			userId = Long.parseLong(jwtService.extractUserId(token));
		}
		
		if(userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			Users user = userService.findById(userId);
			if(jwtService.isTokenValid(token, user)) {
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user, null,null);	
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}
		filterChain.doFilter(request, response);
	}
}