package com.openclassrooms.mddapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.stereotype.Repository;
import com.openclassrooms.mddapi.models.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
	@NativeQuery(value="SELECT * FROM comment where comment.article = ?1")
	public List<Comment> findByArticle(Long idArticle);
}