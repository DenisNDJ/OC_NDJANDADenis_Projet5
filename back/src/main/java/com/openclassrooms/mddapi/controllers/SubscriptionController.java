package com.openclassrooms.mddapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.services.SubscriptionService;
import com.openclassrooms.mddapi.services.jwtToken.JWTService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/sub")
public class SubscriptionController {
	
	@Autowired
	private SubscriptionService subscriptionService;
	@Autowired
	private JWTService jWTService;
	
	@GetMapping("/user")
	public ResponseEntity<?> findByUser(HttpServletRequest request){
		String idUser = this.jWTService.extractUserIdFromHttpRequest(request);
		List<Theme> themeLst = this.subscriptionService.findAllSubscriptionByUser(idUser);
		themeLst = this.subscriptionService.setupSub(themeLst);
		return new ResponseEntity(themeLst, HttpStatus.OK);
	}
	
	@PostMapping("/{id}")
	public ResponseEntity<?> subscribe(@PathVariable("id") String idTheme, HttpServletRequest request){
		String idUser = this.jWTService.extractUserIdFromHttpRequest(request);
		this.subscriptionService.subscribe(Long.parseLong(idTheme), Long.parseLong(idUser));
		return ResponseEntity.ok().body(null);
	}
	
	 @DeleteMapping("/{id}")
	 public ResponseEntity<?> unsubscribe(@PathVariable("id") String idTheme, HttpServletRequest request){
			String idUser = this.jWTService.extractUserIdFromHttpRequest(request);
			this.subscriptionService.unsubscribe(Long.parseLong(idTheme), Long.parseLong(idUser));
			return ResponseEntity.ok().body(null);
		}
	

}
