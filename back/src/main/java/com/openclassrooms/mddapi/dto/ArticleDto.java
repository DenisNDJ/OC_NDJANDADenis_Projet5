package com.openclassrooms.mddapi.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.models.Users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDto {
	
	private Long id;
	
	private String title;
	
	private String content;
	
	private LocalDate date;
	
	private Users user;
	
	private Theme theme;

}
