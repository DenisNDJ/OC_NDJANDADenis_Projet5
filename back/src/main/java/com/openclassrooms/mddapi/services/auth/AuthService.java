package com.openclassrooms.mddapi.services.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.payload.LoginRequest;
import com.openclassrooms.mddapi.dto.payload.RegisterRequest;
import com.openclassrooms.mddapi.models.Users;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	public boolean userPresentDB(String email) {
		return this.userRepository.existsByEmail(email);
	}

	public boolean verifyPassword(LoginRequest loginRequest) {
		Users userDb = this.userRepository.findByEmail(loginRequest.email());
		
		if(encoder.matches(loginRequest.password(),userDb.getPassword())) {
			return true;
		}
		else return false;
	}

	public Users register(RegisterRequest registerRequest) {
		Users user = new Users(	registerRequest.username(),
								registerRequest.email(),
								passwordEncoder.encode(registerRequest.password()));
		return this.userRepository.save(user);		
	}

}
