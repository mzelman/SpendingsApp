package com.mz.spendingsapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.mz.spendingsapp.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    public List<Category> findAllByUserUsername(String username, Sort sort);

    public Optional<Category> findByIdAndUserUsername(Long id, String username);

    public Optional<Category> findByNameAndUserUsername(String categoryName, String username);

}
