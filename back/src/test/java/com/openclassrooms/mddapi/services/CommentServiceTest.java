package com.openclassrooms.mddapi.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.repository.CommentRepository;

@ExtendWith(MockitoExtension.class)
public class CommentServiceTest {
	
	@InjectMocks
	CommentService commentService;
	@Mock
	CommentRepository commentRepository;
	
	Comment comment_1 = new Comment();
	Comment comment_2 = new Comment();
	List<Comment> comments = new ArrayList<Comment>();

	@BeforeEach
	public void init() {
		comments.add(comment_1);
		comments.add(comment_2);
	}
	
	@AfterEach
	public void clearList() {
		comments.clear();
	}
	
	@Test
	@DisplayName("Save comment")
	void create() {
		when(commentRepository.save(comment_1)).thenReturn(comment_1);
		
		commentService.save(comment_1);

		verify(commentRepository, times(1)).save(comment_1);
	}	
	
	@Test
	@DisplayName("Find all comment by articleId")
	void findAll() {
		List<Comment> commentLstDb;
		
		when(commentRepository.findByArticle((long)1)).thenReturn(comments);
		
		commentLstDb = commentService.getByIdArticle((long)1);

		verify(commentRepository, times(1)).findByArticle((long)1);
		assertThat(commentLstDb).isEqualTo(comments);
	}
}
