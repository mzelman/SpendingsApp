package com.mz.spendingsapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.mz.spendingsapp.entity.Category;
import com.mz.spendingsapp.entity.User;
import com.mz.spendingsapp.exception.EntityNotFoundException;
import com.mz.spendingsapp.exception.UsernameAlreadyExistsException;
import com.mz.spendingsapp.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User findByUsername(String username) {
        return unwrapUser(userRepository.findByUsername(username));
    }

    public User saveUser(User user) {
        if (!userRepository.findByUsername(user.getUsername()).isPresent()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(addPresetCategories(user));
        } else {
            throw new UsernameAlreadyExistsException(user.getUsername());
        }
    }

    public String getCurrentUserUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return null;
        }
        return authentication.getName();
    }

    public User getCurrentUser() {
        return findByUsername(getCurrentUserUsername());
    }

    static User unwrapUser(Optional<User> user) {
        return user.orElseThrow(() -> new EntityNotFoundException(User.class));
    }

    private User addPresetCategories(User user) {
        List<Category> presetCategories = new ArrayList<>();

        Category category1 = new Category();
        category1.setName("Groceries");
        category1.setImage("bi bi-basket");
        category1.setUser(user);
        presetCategories.add(category1);

        Category category2 = new Category();
        category2.setName("Utilities");
        category2.setImage("bi bi-house");
        category2.setUser(user);
        presetCategories.add(category2);

        Category category3 = new Category();
        category3.setName("Travel");
        category3.setImage("bi bi-bus-front");
        category3.setUser(user);
        presetCategories.add(category3);

        Category category4 = new Category();
        category4.setName("Shopping");
        category4.setImage("bi bi-cart");
        category4.setUser(user);
        presetCategories.add(category4);

        Category category5 = new Category();
        category5.setName("Leisure");
        category5.setImage("bi bi-joystick");
        category5.setUser(user);
        presetCategories.add(category5);

        Category category6 = new Category();
        category6.setName("Health");
        category6.setImage("bi bi-building");
        category6.setUser(user);
        presetCategories.add(category6);

        Category category7 = new Category();
        category7.setName("Education");
        category7.setImage("bi bi-book");
        category7.setUser(user);
        presetCategories.add(category7);

        Category category8 = new Category();
        category8.setName("Sport");
        category8.setImage("bi bi-bicycle");
        category8.setUser(user);
        presetCategories.add(category8);

        Category category9 = new Category();
        category9.setName("Savings");
        category9.setImage("bi bi-piggy-bank");
        category9.setUser(user);
        presetCategories.add(category9);

        Category category10 = new Category();
        category10.setName("Others");
        category10.setImage("bi bi-umbrella");
        category10.setUser(user);
        presetCategories.add(category10);

        user.setCategories(presetCategories);

        return user;
    }

}
