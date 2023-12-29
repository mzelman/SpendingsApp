package com.mz.spendingsapp;

import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mz.spendingsapp.exception.CategoryAlreadyExistsException;
import com.mz.spendingsapp.exception.EntityNotFoundException;
import com.mz.spendingsapp.exception.ErrorResponse;
import com.mz.spendingsapp.exception.UsernameAlreadyExistsException;

@ControllerAdvice

public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {

        @ExceptionHandler(CategoryAlreadyExistsException.class)
    @ResponseBody
    public ResponseEntity<Object> handleCategoryAlreadyExistsException(CategoryAlreadyExistsException e) {
        ErrorResponse err = new ErrorResponse(Arrays.asList(e.getMessage()));
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Object> handleEntityNotFoundException(EntityNotFoundException e) {
        ErrorResponse err = new ErrorResponse(Arrays.asList(e.getMessage()));
        return new ResponseEntity<>(err, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UsernameAlreadyExistsException.class)
    @ResponseBody
    public ResponseEntity<Object> handleUsernameAlreadyExistsException(UsernameAlreadyExistsException e) {
        ErrorResponse err = new ErrorResponse(Arrays.asList(e.getMessage()));
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }
}
