package com.openclassrooms.mddapi.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.repository.ArticleRepository;

@Service
public class ArticleService {
	@Autowired
	private ArticleRepository articleRepository;
	
	public void save(Article article) {
		this.articleRepository.save(article);
	}
	
	public Article getById(long id) {
		return this.articleRepository.findById(id).orElse(null);
	}

	public List<Article> findByUserSubscription(long idUser) {
		return this.articleRepository.findByUserSubscription(idUser);
	}
	
	public List<Article> findAll() {
		return this.articleRepository.findAll();
	}

}
