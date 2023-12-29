package com.mz.spendingsapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mz.spendingsapp.entity.Transaction;
import com.mz.spendingsapp.exception.EntityNotFoundException;
import com.mz.spendingsapp.repository.CategoryRepository;
import com.mz.spendingsapp.repository.TransactionRepository;
import com.mz.spendingsapp.repository.UserRepository;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryService categoryService;

    @Autowired
    UserService userService;

    public Transaction getTransaction(Long transactionId) {
        return unwrap(transactionRepository.findByIdAndUserUsername(transactionId, userService.getCurrentUserUsername()));
    }

    public List<Transaction> listUserTransactions() {
        return transactionRepository.findAllByUserId(userService.getCurrentUser().getId(), Sort.by("id"));
    }

    public List<Transaction> listUserYearMonthTransactions(String yearMonth) {
        return transactionRepository.findAllByYearMonthCreatedAndUserId(yearMonth,
                userService.getCurrentUser().getId());
    }

    //
    public List<Transaction> listCategoryYearMonthTransactions(Long categoryId, String yearMonth) {
        categoryService.getCategory(categoryId);
        return transactionRepository.findAllByYearMonthCreatedAndCategoryId(yearMonth, categoryId);
    }

    public void saveTransaction(Long categoryId, Transaction transaction) {
        transaction.setCategory(categoryService.getCategory(categoryId));
        transaction.setUser(userService.getCurrentUser());
        transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long transactionId) {
        getTransaction(transactionId);
        transactionRepository.deleteById(transactionId);
    }

    static Transaction unwrap(Optional<Transaction> transaction) {
        return transaction.orElseThrow(() -> new EntityNotFoundException(Transaction.class));
    }

}
