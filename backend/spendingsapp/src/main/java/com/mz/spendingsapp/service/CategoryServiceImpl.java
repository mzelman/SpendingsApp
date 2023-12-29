package com.mz.spendingsapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mz.spendingsapp.entity.Category;
import com.mz.spendingsapp.exception.CategoryAlreadyExistsException;
import com.mz.spendingsapp.exception.EntityNotFoundException;
import com.mz.spendingsapp.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    UserService userService;

    public Category getCategory(Long categoryId) {
        return unwrap(categoryRepository.findByIdAndUserUsername(categoryId, userService.getCurrentUserUsername()));
    }

    public List<Category> listCategories() {
        return categoryRepository.findAllByUserUsername(userService.getCurrentUserUsername(), Sort.by("id"));
    }

    public void saveCategory(Category category) {
        if (!categoryRepository.findByNameAndUserUsername(category.getName(), userService.getCurrentUserUsername())
                .isPresent()) {
            category.setUser(userService.getCurrentUser());
            categoryRepository.save(category);
        } else {
            throw new CategoryAlreadyExistsException(category.getName());
        }
    }

    public void updateCategory(Long categoryId, Category category) {
        Category updatedCategory = getCategory(categoryId);

        if (!categoryRepository.findByNameAndUserUsername(category.getName(), userService.getCurrentUserUsername())
                .isPresent()) {
            updatedCategory.setImage(category.getImage());
            updatedCategory.setName(category.getName());
            categoryRepository.save(updatedCategory);
        } else if (updatedCategory.getName().equals(category.getName())) {
            updatedCategory.setImage(category.getImage());
            categoryRepository.save(updatedCategory);
        } else {
            throw new CategoryAlreadyExistsException(category.getName());
        }
    }

    public void deleteCategory(Long categoryId) {
        getCategory(categoryId);
        categoryRepository.deleteById(categoryId);
    }

    static Category unwrap(Optional<Category> category) {
        return category.orElseThrow(() -> new EntityNotFoundException(Category.class));
    }

}
