package com.mz.spendingsapp.service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mz.spendingsapp.entity.Income;
import com.mz.spendingsapp.entity.Transaction;

@Service
public class TotalsServiceImpl implements TotalsService {

    @Autowired
    private IncomeService incomeService;

    @Autowired
    private TransactionService transactionService;

    public BigDecimal getUserTotalIncome() {
        BigDecimal total = new BigDecimal(0);
        for (Income income : incomeService.listUserIncomes()) {
            total = total.add(income.getAmount());
        }
        return total;
    }

    public BigDecimal getUserTotalMonthIncome(String yearMonth) {
        BigDecimal total = new BigDecimal(0);
        for (Income income : incomeService.listUserYearMonthIncomes(yearMonth)) {
            total = total.add(income.getAmount());
        }
        return total;
    }

    public BigDecimal getUserTotalSpendings() {
        BigDecimal total = new BigDecimal(0);
        for (Transaction transaction : transactionService.listUserTransactions()) {
            total = total.add(transaction.getAmount());
        }
        return total;
    }

    public BigDecimal getUserTotalMonthSpendings(String yearMonth) {
        BigDecimal total = new BigDecimal(0);
        for (Transaction transaction : transactionService.listUserYearMonthTransactions(yearMonth)) {
            total = total.add(transaction.getAmount());
        }
        return total;
    }

    public BigDecimal getUserBalance() {
        BigDecimal balance = new BigDecimal(0);
        balance = getUserTotalIncome().subtract(getUserTotalSpendings());
        return balance;
    }

    public BigDecimal getTransactionsYearMonthCategoryTotal(Long categoryId, String yearMonth) {
        BigDecimal total = new BigDecimal(0);
        for (Transaction transaction : transactionService.listCategoryYearMonthTransactions(categoryId, yearMonth)) {
            total = total.add(transaction.getAmount());
        }
        return total;
    }

}
