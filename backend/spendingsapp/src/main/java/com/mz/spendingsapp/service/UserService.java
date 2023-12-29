package com.mz.spendingsapp.service;

import com.mz.spendingsapp.entity.User;

public interface UserService {

    public User findByUsername(String username);

    public User saveUser(User user);

    public String getCurrentUserUsername();

    public User getCurrentUser();

    // public boolean checkIfResourceOwner(String username);

}
