package com.mz.spendingsapp.security.manager;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.mz.spendingsapp.entity.User;
import com.mz.spendingsapp.service.UserService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component

public class CustomAuthenticationManager implements AuthenticationManager {


    private UserService userService;
    private BCryptPasswordEncoder encoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        
        User user = userService.findByUsername(authentication.getName());
        if (!encoder.matches(authentication.getCredentials().toString(), user.getPassword())) {
            throw new BadCredentialsException("Wrong password");
        }
        return new UsernamePasswordAuthenticationToken(authentication.getName(), user.getPassword());
    }
    
}
