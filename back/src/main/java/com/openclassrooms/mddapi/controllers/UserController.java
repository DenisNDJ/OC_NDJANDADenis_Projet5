package com.openclassrooms.mddapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.UsersDto;
import com.openclassrooms.mddapi.dto.payload.ResponseMessage;
import com.openclassrooms.mddapi.exeption.BadRequestException;
import com.openclassrooms.mddapi.mapper.UserMapper;
import com.openclassrooms.mddapi.models.Users;
import com.openclassrooms.mddapi.services.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
	private UserMapper userMapper;
	
	@PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String idUser, @RequestBody UsersDto usersDto) {
		Users user = this.userMapper.convertToEntity(usersDto);
		
		user = this.userService.update(Long.parseLong(idUser),user);

		return ResponseEntity.ok().body(this.userMapper.toDto(user));
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable("id") String idUser) {
		if(this.userService.findById(Long.parseLong(idUser)) == null) {
			return new ResponseEntity("User not Found!", HttpStatus.UNAUTHORIZED);
		}
		Users user = this.userService.findById(Long.parseLong(idUser));

		return ResponseEntity.ok().body(this.userMapper.toDto(user));
	}
	

}
