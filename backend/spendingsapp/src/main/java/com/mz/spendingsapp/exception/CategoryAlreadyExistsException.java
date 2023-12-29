package com.mz.spendingsapp.exception;

public class CategoryAlreadyExistsException extends RuntimeException {
    
    public CategoryAlreadyExistsException(String categoryName) {
        super("Category '" + categoryName + "' already exists. Please choose a different name.");
    }

}
