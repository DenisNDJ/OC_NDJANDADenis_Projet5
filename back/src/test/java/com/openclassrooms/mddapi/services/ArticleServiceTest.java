package com.openclassrooms.mddapi.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.repository.ArticleRepository;

@ExtendWith(MockitoExtension.class)
public class ArticleServiceTest {
	
	@InjectMocks
	ArticleService articleService;
	@Mock
	ArticleRepository articleRepository;
	
	Article article_1 = new Article();
	Article article_2 = new Article();
	List<Article> articles = new ArrayList<Article>();

	@BeforeEach
	public void init() {
		articles.add(article_1);
		articles.add(article_2);
	}
	
	@AfterEach
	public void clearList() {
		articles.clear();
	}
	
	@Test
	@DisplayName("Save Article")
	void create() {
		when(articleRepository.save(article_1)).thenReturn(article_1);
		
		articleService.save(article_1);

		verify(articleRepository, times(1)).save(article_1);
	}	
	
	@Test
	@DisplayName("Find article by ID")
	void findById() {
		Article articleDb = new Article();
		article_1.setId((long)1);
		articleDb.setId((long)1);
		
		when(articleRepository.findById((long)1)).thenReturn(Optional.of(article_1));
		
		articleDb = articleService.getById((long)1);

		verify(articleRepository, times(1)).findById((long)1);
		assertThat(articleDb).isEqualTo(article_1);
	}
	
	@Test
	@DisplayName("Find all article")
	void findAll() {
		List<Article> articleLstDb;
		
		when(articleRepository.findAll()).thenReturn(articles);
		
		articleLstDb = articleService.findAll();

		verify(articleRepository, times(1)).findAll();
		assertThat(articleLstDb).isEqualTo(articles);
	}
	
	@Test
	@DisplayName("Find subscribed article")
	void findSubscribed() {
		List<Article> articleLstDb;
		
		when(articleRepository.findByUserSubscription((long)1)).thenReturn(articles);
		
		articleLstDb = articleService.findByUserSubscription((long)1);

		verify(articleRepository, times(1)).findByUserSubscription((long)1);
		assertThat(articleLstDb).isEqualTo(articles);
	}
	
}
