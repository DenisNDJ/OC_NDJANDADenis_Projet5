package com.openclassrooms.mddapi.models;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "comment")
public class Comment {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @OneToOne
    @JoinColumn(name = "article", referencedColumnName = "id")
    private Article article;

    @OneToOne
    @JoinColumn(name = "user", referencedColumnName = "id")
	private Users user;
    
    @CreationTimestamp
    private LocalDateTime date;
}