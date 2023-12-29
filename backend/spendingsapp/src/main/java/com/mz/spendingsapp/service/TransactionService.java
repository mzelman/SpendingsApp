package com.mz.spendingsapp.service;

import java.util.List;

import com.mz.spendingsapp.entity.Transaction;

public interface TransactionService {

        public List<Transaction> listUserTransactions();

        public List<Transaction> listUserYearMonthTransactions(String yearMonth);

        public List<Transaction> listCategoryYearMonthTransactions(Long categoryId, String yearMonth);

        public void saveTransaction(Long categoryId, Transaction transaction);

        public void deleteTransaction(Long transactionId);

}
