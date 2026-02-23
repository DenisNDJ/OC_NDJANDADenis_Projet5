package com.openclassrooms.mddapi.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "subscription")
public class Subscription {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
    @OneToOne
    @JoinColumn(name = "theme", referencedColumnName = "id")
	private Theme theme;
	
    @OneToOne
    @JoinColumn(name = "user", referencedColumnName = "id")
	private Users user;

}
