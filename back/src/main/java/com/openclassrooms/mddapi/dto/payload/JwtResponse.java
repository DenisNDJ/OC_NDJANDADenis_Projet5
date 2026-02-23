package com.openclassrooms.mddapi.dto.payload;

public record JwtResponse(
		Long id,
		String username,
		String email,
		String token) {
	
	public JwtResponse(Long id,String username,String email,String token) {
		this.id=id;
		this.username=username;
		this.email=email;
		this.token=token;	
	}

}