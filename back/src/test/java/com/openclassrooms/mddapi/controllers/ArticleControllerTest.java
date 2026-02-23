package com.openclassrooms.mddapi.controllers;

import org.junit.jupiter.api.BeforeEach;
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
import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.dto.payload.JwtResponse;
import com.openclassrooms.mddapi.dto.payload.LoginRequest;


@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@DirtiesContext(classMode = ClassMode.BEFORE_CLASS)
public class ArticleControllerTest {
	
	private ObjectMapper objectMapper = new ObjectMapper();
	@Autowired
    private MockMvc mockMvc;
	String mockAuthorization;
	
	@BeforeEach
    public void setupAuth() throws JsonProcessingException, Exception {
		LoginRequest loginRequest = new LoginRequest("q@q", "ddd");
        
        MvcResult mockResponse = mockMvc.perform(post("/api/auth/login")
        	.contentType(MediaType.APPLICATION_JSON)
	        .characterEncoding("utf-8")
	        .content(objectMapper.writeValueAsString(loginRequest)))
        	.andExpect(status().isOk())
	        .andReturn();
        
        String json = mockResponse.getResponse().getContentAsString();
        JwtResponse mockJwtResponse = objectMapper.readValue(json, JwtResponse.class);
        
        mockAuthorization = "Bearer " + mockJwtResponse.token();
    }
	
	@Test
	public void getSessionbyId() throws Exception {
		objectMapper.registerModule(new JavaTimeModule());
        
		MvcResult mockResponse = mockMvc.perform(get("/api/article/subscribed")
				            	.contentType(MediaType.APPLICATION_JSON)
				    	        .characterEncoding("utf-8")
				    	        .header("Authorization", mockAuthorization))
				            	.andExpect(status().isOk())
				            	.andReturn();
        
        String json = mockResponse.getResponse().getContentAsString();
        List<ArticleDto> articles = objectMapper.readValue(json, new TypeReference<>(){});

		assertThat(articles).isNotNull();
		assertThat(articles.size()).isEqualTo(7);
		assertThat(articles.get(0).getTitle()).isEqualTo("Wiki Java");
		assertThat(articles.get(1).getTitle()).isEqualTo("Wiki Python");
	}
	
}














