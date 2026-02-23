package com.openclassrooms.mddapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.openclassrooms.mddapi.models.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
	public Users findByEmail(String email);
	public boolean existsByEmail(String email);
}