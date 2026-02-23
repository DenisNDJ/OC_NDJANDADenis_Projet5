package com.openclassrooms.mddapi.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import com.openclassrooms.mddapi.services.jwtToken.JWTService;

@ExtendWith(MockitoExtension.class)
public class ThemeServiceTest {
	@Mock
	JWTService jWTService;
	@Mock
	SubscriptionService subscriptionService;
	@InjectMocks
	ThemeService themeService;
	@Mock
	ThemeRepository themeRepository;
	
	List<Theme> themeLst = new ArrayList<Theme>();
	List<Theme> themeSubLst = new ArrayList<Theme>();;
	
	@AfterEach
	public void clearList() {
		themeLst.clear();
		themeSubLst.clear();
	}
	
	@Test
	@DisplayName("Find all theme")
	void findAll() {
		
		List<Theme> themeLstDb;
		
		when(themeRepository.findAll()).thenReturn(themeLst);
		
		themeLstDb = themeService.findAll();

		verify(themeRepository, times(1)).findAll();
		assertThat(themeLstDb).isEqualTo(themeLst);
	}
	
	@Test
	@DisplayName("Setup theme subscription")
	void setupSubscription() {
		Theme theme_1 = new Theme((long)1);
		Theme theme_2 = new Theme((long)2);
		List<Theme> themeLstDb;
		String idUser = "1";

		themeLst.add(theme_1);
		themeLst.add(theme_2);
		themeSubLst.add(theme_2);

		when(jWTService.extractUserIdFromHttpRequest(null)).thenReturn(idUser);
		when(subscriptionService.findAllSubscriptionByUser(idUser)).thenReturn(themeSubLst);
		
		themeLstDb = themeService.setupSubscription(themeLst, null);

		verify(jWTService, times(1)).extractUserIdFromHttpRequest(null);
		verify(subscriptionService, times(1)).findAllSubscriptionByUser(idUser);
		assertThat(themeLstDb.get(0).isSubscribed()).isEqualTo(false);
		assertThat(themeLstDb.get(1).isSubscribed()).isEqualTo(true);
	}

}





















