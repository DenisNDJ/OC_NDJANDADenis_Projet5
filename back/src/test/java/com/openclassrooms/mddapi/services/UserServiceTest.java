package com.openclassrooms.mddapi.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Users;
import com.openclassrooms.mddapi.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
	
	@InjectMocks
	UserService userService;
	@Mock
	UserRepository userRepository;
	
	Users user_1 = new Users();
	
	@Test
	@DisplayName("Save User")
	void create() {
		when(userRepository.save(user_1)).thenReturn(user_1);
		
		userService.save(user_1);

		verify(userRepository, times(1)).save(user_1);
	}
	
	@Test
	@DisplayName("Find user by email")
	void findByEmail() {
		String email = "denis@gmail.com";
		Users userDb;
		user_1.setEmail(email);
		
		when(userRepository.findByEmail(email)).thenReturn(user_1);
		
		userDb = userService.findByEmail(email);

		verify(userRepository, times(1)).findByEmail(email);
		assertThat(userDb).isEqualTo(user_1);
	}
	
	@Test
	@DisplayName("Find user by id")
	void findById() {
		Users userDb;
		user_1.setId((long)1);
		
		when(userRepository.findById((long)1)).thenReturn(Optional.of(user_1));
		
		userDb = userService.findById((long)1);

		verify(userRepository, times(1)).findById((long)1);
		assertThat(userDb).isEqualTo(user_1);
	}
	
	@Test
	@DisplayName("Update user")
	void update() {
		Users userDb = new Users((long)1, "","deno@gmail.com", "Mamao");
		user_1 = new Users((long)1, "ndjanda","denis@gmail.com", "Papao");
		
		when(userRepository.findById((long)1)).thenReturn(Optional.of(user_1));
		when(userRepository.save(user_1)).thenReturn(user_1);
		
		userDb = userService.update((long)1, userDb);

		verify(userRepository, times(1)).findById((long)1);
		assertThat(userDb).isEqualTo(new Users((long)1, "ndjanda","deno@gmail.com", "Mamao"));
	}
	
	@Test
	@DisplayName("Update user")
	void updateNull() {
		Users userDb = new Users((long)1, "","", "");
		user_1 = new Users((long)1, "ndjanda","denis@gmail.com", "Papao");
		
		when(userRepository.findById((long)1)).thenReturn(Optional.of(user_1));
		when(userRepository.save(user_1)).thenReturn(user_1);
		
		userDb = userService.update((long)1, userDb);

		verify(userRepository, times(1)).findById((long)1);
		assertThat(userDb).isEqualTo(user_1);
	}

}























