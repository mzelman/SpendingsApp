package com.mz.spendingsapp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mz.spendingsapp.entity.User;
import com.mz.spendingsapp.security.manager.CustomAuthenticationManager;
import com.mz.spendingsapp.service.UserService;

@RequestMapping("/user")
@RestController
@CrossOrigin(origins = "https://spendingsapp-frontend-production.up.railway.app/", maxAge = 3600, allowCredentials = "true")

public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    CustomAuthenticationManager authenticationManager;

    @GetMapping("/checkToken")
    public ResponseEntity<String> checkToken() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> register(@RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
