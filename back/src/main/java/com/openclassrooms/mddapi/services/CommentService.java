package com.openclassrooms.mddapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.repository.CommentRepository;

@Service
public class CommentService {
	
	@Autowired
	private CommentRepository commentRepository;
	
	public void save(Comment comment) {
		this.commentRepository.save(comment);
	}
	
	public List<Comment> getByIdArticle(Long idArticle) {
		return this.commentRepository.findByArticle(idArticle);
	}

}
