package com.openclassrooms.mddapi.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ParseException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.openclassrooms.mddapi.dto.UsersDto;
import com.openclassrooms.mddapi.models.Users;

@Component
public class UserMapper {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
	public Users convertToEntity(UsersDto userDto) throws ParseException {
		Users user = modelMapper.map(userDto, Users.class);
		if(user.getPassword() != "") user.setPassword(passwordEncoder.encode(user.getPassword()));
	    return user;
	}
	
	public UsersDto toDto(Users user) {
		UsersDto userDto = modelMapper.map(user, UsersDto.class);
		userDto.setPassword("");
	    return userDto;
	}
}
