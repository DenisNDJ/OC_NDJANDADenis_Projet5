package com.openclassrooms.mddapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.models.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
	public List<Article> findByUser(Long idUser);
	public List<Article> findByTheme(Long idTheme);

	@NativeQuery(value="SELECT * FROM article where article.theme in (select subscription.theme from subscription where subscription.user = ?1)")
	public List<Article> findByUserSubscription(Long idUser);

}