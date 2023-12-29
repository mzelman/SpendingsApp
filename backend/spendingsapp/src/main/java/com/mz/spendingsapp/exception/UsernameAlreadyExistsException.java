package com.mz.spendingsapp.exception;

public class UsernameAlreadyExistsException extends RuntimeException {
    
    public UsernameAlreadyExistsException(String username) {
        super("Username '" + username + "' already exists. Please choose a different one.");
    }

}
