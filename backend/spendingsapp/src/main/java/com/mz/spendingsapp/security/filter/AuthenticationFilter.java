package com.mz.spendingsapp.security.filter;

import java.io.IOException;
import java.util.Date;

import org.springframework.security.core.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mz.spendingsapp.entity.User;
import com.mz.spendingsapp.security.SecurityConstants;
import com.mz.spendingsapp.security.manager.CustomAuthenticationManager;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @Autowired
    private CustomAuthenticationManager customAuthenticationManager;

    @Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        try {
            User user = new ObjectMapper().readValue(request.getInputStream(), User.class);
            Authentication authentication = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
            return customAuthenticationManager.authenticate(authentication);
        } catch (IOException e) {
            throw new RuntimeException();
        }
	}


    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(failed.getMessage());
        response.getWriter().flush();
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, 
                                            FilterChain chain, Authentication auth) 
        throws IOException, ServletException {
        String token = JWT.create()
        .withSubject(auth.getName())
        .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.TOKEN_EXPIRATION))
        .sign(Algorithm.HMAC512(SecurityConstants.SECRET_KEY));
        response.addHeader("Authorization", "Bearer " + token);
    //     System.out.println("Generated Token: " + token);
    //     response.getWriter().write(token); // Just for debugging
    // response.getWriter().flush();
}
}
