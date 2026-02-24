package com.openclassrooms.mddapi.mapper;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ParseException;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Users;
import com.openclassrooms.mddapi.services.jwtToken.JWTService;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class ArticleMapper {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private JWTService jwtService;
	
	public ArticleDto toDto(Article article) {
		ArticleDto articleDto = modelMapper.map(article, ArticleDto.class);
		articleDto = cleanArticleDtoUser(articleDto);
	    return articleDto;
	}
	
	public List<ArticleDto> toDto(List<Article> articleLst){
		List<ArticleDto> articleDtoLst =  new ArrayList<ArticleDto>();
		
		articleLst.forEach((article)->{
			articleDtoLst.add(modelMapper.map(article, ArticleDto.class));
		});
		return articleDtoLst;
	}
	
	public Article convertToEntity(ArticleDto articleDto, HttpServletRequest request) throws ParseException {
		Article article = modelMapper.map(articleDto, Article.class);
		article.setUser(new Users(Long.parseLong(this.jwtService.extractUserIdFromHttpRequest(request))));
	    return article;
	}
	
	public ArticleDto cleanArticleDtoUser(ArticleDto articleDto) {
		articleDto.getUser().setPassword("");
		articleDto.getUser().setEmail("");
		return articleDto;
	}
}
