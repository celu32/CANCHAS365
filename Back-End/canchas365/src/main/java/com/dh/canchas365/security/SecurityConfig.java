package com.dh.canchas365.security;

import com.dh.canchas365.security.filters.JwtAuthenticationFilter;
import com.dh.canchas365.security.filters.JwtAuthorizationFilter;
import com.dh.canchas365.security.jwt.JwtUtils;
import com.dh.canchas365.service.auth.UserDetailsServiceImpl;
import com.dh.canchas365.service.auth.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private static final String[] SWAGGER_PATHS = {"/swagger-ui.html", "/v3/api-docs/**", "/v3/api-docs.yaml","/swagger-ui/**", "/webjars/swagger-ui/**"};
    public static final String AUTHORIZATION_HEADER = "Authorization";
    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    JwtAuthorizationFilter jwtAuthorizationFilter;

    @Autowired
    UserService userService;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, AuthenticationManager authenticationManager) throws Exception {

        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtUtils, userDetailsService, userService);
        jwtAuthenticationFilter.setAuthenticationManager(authenticationManager);
       // jwtAuthenticationFilter.setFilterProcessesUrl("/login");


        return httpSecurity
                .csrf(config -> config.disable())
                .cors(withDefaults())
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/login").permitAll();
                    auth.requestMatchers("/user/signup").permitAll();

                    auth.requestMatchers("/category/**","GET").permitAll();
                    auth.requestMatchers("/city","GET").permitAll();
                    auth.requestMatchers("/club/**","GET").permitAll();
                    auth.requestMatchers("/playingField/**","GET").permitAll();
                    auth.requestMatchers("/characteristic/**","GET").permitAll();
                    auth.requestMatchers("/image/**","GET").permitAll();
                    auth.requestMatchers("/email/**","POST").permitAll();
                    auth.requestMatchers("/club/by-categories","POST").permitAll();
                    auth.requestMatchers("/club/search","POST").permitAll();
                    auth.requestMatchers("/reservation/searchByClub","POST").permitAll();

                    auth.requestMatchers("/image/**","POST").permitAll();

                    auth.requestMatchers(SWAGGER_PATHS).permitAll();
                    // permito crear roles para crear los roles iniciales.. luego comentar
                    //auth.requestMatchers("/rol/create").permitAll();
                    // permito crear usuario para crear el usuario maestro.. luego comentar
                    //auth.requestMatchers("/usuarios/crear").permitAll();
                    // comento esta linea que me quite el secrity a toda la API
                    auth.anyRequest().authenticated();
//                    auth.anyRequest().permitAll();
                })
                .sessionManagement(session -> {
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                })
                .addFilter(jwtAuthenticationFilter)
                .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(HttpSecurity httpSecurity, PasswordEncoder passwordEncoder) throws Exception {
    return httpSecurity.getSharedObject(AuthenticationManagerBuilder.class)
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder)
            .and().build();
    }

}
