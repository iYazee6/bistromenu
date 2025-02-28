package com.bistromenu.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

    @Bean
    public UserDetailsService userDetailsService() {
        // Completely disable the default in-memory user
        return new InMemoryUserDetailsManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        logger.info("SecurityConfig  ------------ CAN SEE ");

        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // No
                                                                                                              // sessions
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll() // Allow login & register API
                        .requestMatchers("/public/**").permitAll() // Allow public APIs
                        .requestMatchers("/api/menu/menuExrestaurant").permitAll() // ✅ Publicly accessible API
                        .requestMatchers("/api/menu/byRestaurant/**").authenticated() // 🔒 Requires authentication
                        // .anyRequest().authenticated() // Secure other endpoints
                        .anyRequest().denyAll() // ⛔ Deny all other requests by default
                )
                .formLogin(login -> login.disable()) // ❌ Disable login form
                .httpBasic(httpBasic -> httpBasic.disable()); // ❌ Disable HTTP Basic Auth
        // .formLogin().disable()
        // .httpBasic().disable();

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
