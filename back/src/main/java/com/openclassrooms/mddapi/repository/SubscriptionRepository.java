package com.openclassrooms.mddapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.models.Theme;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
	
	@NativeQuery(value="SELECT * FROM theme where theme.id in (select subscription.theme from subscription where subscription.user = ?1)")
	public List<Theme> findAllSubscriptionByUser(String IdUser);
}