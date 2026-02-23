package com.openclassrooms.mddapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import com.openclassrooms.mddapi.services.jwtToken.JWTService;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class ThemeService {

	@Autowired
	private JWTService jWTService;
	
	@Autowired
	private SubscriptionService subscriptionService;
	
	@Autowired
	private ThemeRepository themeRepository;
	
	public List<Theme> findAll() {
		return this.themeRepository.findAll();
	}
	
	public List<Theme> setupSubscription(List<Theme> themeList, HttpServletRequest request) {
		
		String idUser = this.jWTService.extractUserIdFromHttpRequest(request);
		
		List<Theme> subscribedTheme = this.subscriptionService.findAllSubscriptionByUser(idUser);
		
		themeList.forEach(theme ->{
			if(subscribedTheme.contains(theme)) theme.setSubscribed(true);
			else theme.setSubscribed(false);
		});
		return themeList;
	}

}
