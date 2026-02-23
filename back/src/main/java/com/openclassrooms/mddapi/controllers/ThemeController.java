package com.openclassrooms.mddapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.mapper.ThemeMapper;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.services.ThemeService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/theme")
public class ThemeController {
	
	@Autowired
	private ThemeService themeService;
	@Autowired
	private ThemeMapper themeMapper;
    
    @GetMapping()
    public ResponseEntity<?> findAll(HttpServletRequest request) {
        List<Theme> themesLst = this.themeService.findAll();
        
        themesLst = this.themeService.setupSubscription(themesLst, request);

        return ResponseEntity.ok().body(this.themeMapper.toDto(themesLst));
    }

}
