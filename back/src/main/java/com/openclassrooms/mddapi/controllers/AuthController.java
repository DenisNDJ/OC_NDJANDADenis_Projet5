package com.openclassrooms.mddapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.payload.JwtResponse;
import com.openclassrooms.mddapi.dto.payload.LoginRequest;
import com.openclassrooms.mddapi.dto.payload.RegisterRequest;
import com.openclassrooms.mddapi.dto.payload.ResponseMessage;
import com.openclassrooms.mddapi.services.auth.AuthService;
import com.openclassrooms.mddapi.services.jwtToken.JWTService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private JWTService jWTService;
	@Autowired
	private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    	if(!this.authService.userPresentDB(loginRequest.email())) {
    		return new ResponseEntity(new ResponseMessage("Error: Email not found!"), HttpStatus.UNAUTHORIZED);
    	}
    	
    	if(this.authService.verifyPassword(loginRequest)) {
    		JwtResponse jwtResponse = this.jWTService.setupJwt(loginRequest.email());
    		return new ResponseEntity(jwtResponse, HttpStatus.OK);
    	}
    	else {
    		return new ResponseEntity(new ResponseMessage("Error: Wrong password!"), HttpStatus.UNAUTHORIZED);
    	}	
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
    	if(this.authService.userPresentDB(registerRequest.email())) {
    		return new ResponseEntity(new ResponseMessage("Error: Email is already taken!"), HttpStatus.UNAUTHORIZED);
    	}
    	
    	this.authService.register(registerRequest);
    	JwtResponse jwtResponse = this.jWTService.setupJwt(registerRequest.email());
    	
    	return new ResponseEntity(jwtResponse, HttpStatus.OK);
    }
	
}
