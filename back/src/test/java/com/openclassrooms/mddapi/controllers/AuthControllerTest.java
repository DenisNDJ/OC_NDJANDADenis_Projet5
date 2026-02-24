package com.openclassrooms.mddapi.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.mddapi.dto.payload.LoginRequest;
import com.openclassrooms.mddapi.dto.payload.RegisterRequest;
import com.openclassrooms.mddapi.repository.UserRepository;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
@DirtiesContext(classMode = ClassMode.BEFORE_CLASS)
public class AuthControllerTest {
	@Autowired
	private UserRepository userRepository;
	private ObjectMapper objectMapper = new ObjectMapper();
	@Autowired
    private MockMvc mockMvc;
	
	@Test
	public void login() throws Exception {
		LoginRequest loginRequest = new LoginRequest("q@q", "ddd");
        
        MvcResult mockResponse = mockMvc.perform(post("/api/auth/login")
        	.contentType(MediaType.APPLICATION_JSON)
	        .characterEncoding("utf-8")
	        .content(objectMapper.writeValueAsString(loginRequest)))
        	.andExpect(status().isOk())
	        .andExpect(jsonPath("$.email").value("q@q"))
	        .andExpect(jsonPath("$.username").value("aa"))
	        .andReturn();
	}
	
	@Test
	public void wrongPassword() throws Exception {
		LoginRequest loginRequest = new LoginRequest("q@q", "wrongPassword");
        
	       mockMvc.perform(post("/api/auth/login")
	               .contentType(MediaType.APPLICATION_JSON)
	               .characterEncoding("utf-8")
	               .content(objectMapper.writeValueAsString(loginRequest)))
           		   .andExpect(status().isUnauthorized());
	}
	
	@Test
	public void wrongEmail() throws Exception {
		LoginRequest loginRequest = new LoginRequest("wrong@email.com", "wrongPassword");
        
	       mockMvc.perform(post("/api/auth/login")
	               .contentType(MediaType.APPLICATION_JSON)
	               .characterEncoding("utf-8")
	               .content(objectMapper.writeValueAsString(loginRequest)))
           		   .andExpect(status().isUnauthorized());
	}
	
	@Test
	public void register() throws Exception {
		RegisterRequest signupRequest = new RegisterRequest("Marc", "marc@gmail.com", "test!1234");
        
	       mockMvc.perform(post("/api/auth/register")
	               .contentType(MediaType.APPLICATION_JSON)
	               .characterEncoding("utf-8")
	               .content(objectMapper.writeValueAsString(signupRequest)))
	               .andExpect(status().isOk());
	       userRepository.delete(userRepository.findByEmail(signupRequest.email()));
	}
	
	@Test
	public void registerFail() throws Exception {
		RegisterRequest signupRequest = new RegisterRequest("Marc", "q@q", "test!1234");
        
	       mockMvc.perform(post("/api/auth/register")
	               .contentType(MediaType.APPLICATION_JSON)
	               .characterEncoding("utf-8")
	               .content(objectMapper.writeValueAsString(signupRequest)))
	               .andExpect(status().isUnauthorized());
	}
	
	
}
