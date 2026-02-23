package com.openclassrooms.mddapi.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;

import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.models.Users;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;

@ExtendWith(MockitoExtension.class)
public class SubscriptionServiceTest {
	@InjectMocks
	SubscriptionService subscriptionService;
	@Mock
	SubscriptionRepository subscriptionRepository;
	
	Users user = new Users((long)1);
	Theme theme = new Theme((long)1);
	Subscription subscription = new Subscription(null, theme, user);
	List<Theme> themeLst = new ArrayList<Theme>();
	
	@Test
	@DisplayName("Subscribe")
	void subscribe() {
		when(subscriptionRepository.save(subscription)).thenReturn(subscription);
		
		subscriptionService.subscribe((long)1,(long)1);

		verify(subscriptionRepository, times(1)).save(subscription);
	}	
	
	@Test
	@DisplayName("Unsubscribe")
	void unsubscribe() {
		
		ExampleMatcher matcher = ExampleMatcher.matching().withIgnorePaths("id");
		
		when(subscriptionRepository.findOne(Example.of(subscription, matcher))).thenReturn(Optional.of(subscription));
		
		doNothing().when(subscriptionRepository).delete(subscription);
		
		subscriptionService.unsubscribe((long)1,(long)1);

		verify(subscriptionRepository, times(1)).delete(subscription);
	}

	
	@Test
	@DisplayName("All theme sub by userId")
	void findAllSubscriptionByUser() {
		List<Theme> themeLstDb = new ArrayList<Theme>();
		
		when(subscriptionRepository.findAllSubscriptionByUser("1")).thenReturn(themeLst);
		
		themeLstDb = subscriptionService.findAllSubscriptionByUser("1");

		verify(subscriptionRepository, times(1)).findAllSubscriptionByUser("1");
		assertThat(themeLstDb).isEqualTo(themeLst);
	}

	@Test
	@DisplayName("Setup all theme")
	void setupSub() {
		List<Theme> themeLstSet = new ArrayList<Theme>();
		theme.setSubscribed(false);
		themeLstSet.add(theme);
		themeLstSet.add(theme);
		themeLstSet.add(theme);
		
		themeLstSet = subscriptionService.setupSub(themeLstSet);

		themeLstSet.forEach((theme)->{
			assertThat(theme.isSubscribed()).isEqualTo(true);
		});
		
	}

}
