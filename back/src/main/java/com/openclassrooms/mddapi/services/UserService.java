package com.openclassrooms.mddapi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.models.Users;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;

    public Users save(Users user) {
        return this.userRepository.save(user);
    }

    public Users findByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    public Users findById(Long id) {
        return this.userRepository.findById(id).orElse(null);
    }
    
    public Users update(Long id, Users user) {
    	Users userDB = findById(id);
    	
    	if(userDB != null) {
    		if(user.getUsername() != "") userDB.setUsername(user.getUsername());
    		if(user.getEmail() != "") userDB.setEmail(user.getEmail());
    		if(user.getPassword() != "") userDB.setPassword(user.getPassword());
    		save(userDB);
    	}
    	return userDB;
    }

}
