package com.openclassrooms.mddapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.models.Users;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;

@Component
public class SubscriptionService {
	
	@Autowired
	private SubscriptionRepository subscriptionRepository;
	
	public void subscribe(Long id_theme, Long id_user) {
		Users user = new Users(id_user);
		Theme theme = new Theme(id_theme);
		Subscription subscription = new Subscription(null, theme, user);
		this.subscriptionRepository.save(subscription);
	}
	
	public void unsubscribe(Long id_theme, Long id_user) {
		Users user = new Users(id_user);
		Theme theme = new Theme(id_theme);
		
		Subscription unsubscription = new Subscription(null, theme, user);
		
		ExampleMatcher matcher = ExampleMatcher.matching().withIgnorePaths("id");
		
		unsubscription = this.subscriptionRepository.findOne(Example.of(unsubscription, matcher)).orElse(null);
		
		this.subscriptionRepository.delete(unsubscription);
	}
	
	public List<Theme> findAllSubscriptionByUser(String idUser){
		return this.subscriptionRepository.findAllSubscriptionByUser(idUser);
	}

	public List<Theme> setupSub(List<Theme> themeLst) {
		themeLst.forEach(theme->theme.setSubscribed(true));
		return themeLst;
	}
	
}
