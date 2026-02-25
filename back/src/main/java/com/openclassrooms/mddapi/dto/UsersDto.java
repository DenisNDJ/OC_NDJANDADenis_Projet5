package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersDto {
	public UsersDto(Long id) {
		this.id = id;
		this.email = "";
		this.password = "";
		this.username = "";
	}
	
    private Long id;
    
    private String username;

    private String email;

    private String password;
}
