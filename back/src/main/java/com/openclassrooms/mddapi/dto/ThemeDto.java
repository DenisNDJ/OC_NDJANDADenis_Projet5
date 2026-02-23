package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThemeDto {
    private Long id;

    private String name;
    
    private String content;
    
    private boolean subscribed = false;
}