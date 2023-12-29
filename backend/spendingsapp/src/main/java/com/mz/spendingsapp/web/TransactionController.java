package com.mz.spendingsapp.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mz.spendingsapp.entity.Transaction;
import com.mz.spendingsapp.service.TransactionService;

@RestController
@RequestMapping("/category/{categoryId}/transaction")
@CrossOrigin(origins = "https://spendingsapp-frontend-production.up.railway.app/", maxAge = 3600, allowCredentials = "true")

public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @GetMapping("/all/{yearMonth}")
    public ResponseEntity<List<Transaction>> listCategoryMonthTransactions(@PathVariable Long categoryId,
            @PathVariable String yearMonth) {
        return new ResponseEntity<>(transactionService.listCategoryYearMonthTransactions(categoryId, yearMonth),
                HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<HttpStatus> addTransaction(@RequestBody Transaction transaction,
            @PathVariable Long categoryId) {
        transactionService.saveTransaction(categoryId, transaction);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<HttpStatus> deleteTransaction(@PathVariable Long transactionId,
            @PathVariable Long categoryId) {
        transactionService.deleteTransaction(transactionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
