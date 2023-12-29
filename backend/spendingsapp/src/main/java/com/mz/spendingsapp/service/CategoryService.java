package com.mz.spendingsapp.service;

import java.util.List;

import com.mz.spendingsapp.entity.Category;

public interface CategoryService {

    public Category getCategory(Long categoryId);

    public List<Category> listCategories();

    public void saveCategory(Category category);

    public void updateCategory(Long categoryId, Category category);

    public void deleteCategory(Long categoryId);

}
