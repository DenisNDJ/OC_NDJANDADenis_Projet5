package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;

import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {	
    private String content;

    private Users user;
    
    private Article article;

    private LocalDateTime date;
}
