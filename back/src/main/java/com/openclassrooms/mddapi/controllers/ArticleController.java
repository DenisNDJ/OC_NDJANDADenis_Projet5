package com.openclassrooms.mddapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.exeption.NotFoundException;
import com.openclassrooms.mddapi.mapper.ArticleMapper;
import com.openclassrooms.mddapi.mapper.CommentMapper;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.services.ArticleService;
import com.openclassrooms.mddapi.services.CommentService;
import com.openclassrooms.mddapi.services.jwtToken.JWTService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/article")
public class ArticleController {

	@Autowired
	private ArticleService articleService;
	@Autowired
	private CommentService commentService;
	@Autowired
	private ArticleMapper articleMapper;
	@Autowired
	private CommentMapper commentMapper;
	@Autowired
	private JWTService jWTService;

    @GetMapping("/subscribed")
    public ResponseEntity<?> findByUserSubscription(HttpServletRequest request) {
    	String idUser = this.jWTService.extractUserIdFromHttpRequest(request);
    	
        List<Article> articlesLst = this.articleService.findByUserSubscription(Long.parseLong(idUser));

        return ResponseEntity.ok().body(this.articleMapper.toDto(articlesLst));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") String idArticle) {
        Article article = this.articleService.getById(Long.parseLong(idArticle));
        
        if(article == null) throw new NotFoundException();
        
        return ResponseEntity.ok().body(this.articleMapper.toDto(article));
    }

    @PostMapping()
    public ResponseEntity<?> create(@Valid @RequestBody ArticleDto articleDto, HttpServletRequest request) {
    	
    	this.articleService.save(this.articleMapper.convertToEntity(articleDto, request));
    	
    	return ResponseEntity.ok().body(null);
    }

    @GetMapping("/{id}/comment")
    public ResponseEntity<?> findComments(@PathVariable("id") String idArticle) {
    	
    	List<Comment> commentLst = this.commentService.getByIdArticle(Long.parseLong(idArticle));
    	
    	return ResponseEntity.ok().body(this.commentMapper.toDto(commentLst));
    }

    @PostMapping("/comment")
    public ResponseEntity<?> createComment(@RequestBody CommentDto commentDto,  HttpServletRequest request) {
    	
    	this.commentService.save(this.commentMapper.convertToEntity(commentDto, request));
    	
    	return ResponseEntity.ok().body(null);
    }
    
    

}
