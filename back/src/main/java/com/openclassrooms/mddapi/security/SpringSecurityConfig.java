package com.openclassrooms.mddapi.security;

import javax.crypto.spec.SecretKeySpec;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import com.openclassrooms.mddapi.security.filter.JwtFilter;

@Configuration
public class SpringSecurityConfig {
	@Autowired
	private JwtFilter jwtFilter;
	
	@Value("${mdd.api.key}")
	private String jwtKey;
	
	private final String[] lstBypass = {"/api/auth/login", "/api/auth/register"};
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {        
		return http
				.csrf(csrf -> csrf.disable())
	            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	            .authorizeHttpRequests(auth -> auth
	            		.requestMatchers(lstBypass).permitAll()
	            		.anyRequest().authenticated())
	            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
	            .build();       
	}
	
	@Bean
	public ModelMapper modelMapper() {
	    return new ModelMapper();
	}

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
	@Bean
	public JwtDecoder jwtDecoder() {
		SecretKeySpec secretKey = new SecretKeySpec(this.jwtKey.getBytes(), 0, this.jwtKey.getBytes().length, "RSA");
		return NimbusJwtDecoder.withSecretKey(secretKey).macAlgorithm(MacAlgorithm.HS256).build();
	}
	
	@Bean
	public JwtEncoder jwtEncoder() {
		return new NimbusJwtEncoder(new ImmutableSecret<>(this.jwtKey.getBytes()));
	}
}