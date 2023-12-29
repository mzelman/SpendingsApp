package com.mz.spendingsapp.web;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mz.spendingsapp.service.TotalsService;
import com.mz.spendingsapp.service.TransactionService;

@RequestMapping("/user")
@RestController
@CrossOrigin(origins = "https://spendingsapp-frontend-production.up.railway.app/", maxAge = 3600, allowCredentials = "true")

public class TotalsController {

    @Autowired
    TotalsService totalsService;

    @Autowired
    TransactionService transactionService;

    @GetMapping("/totalSpendings")
    public ResponseEntity<BigDecimal> getUserTotalSpendings() {
        return new ResponseEntity<BigDecimal>(totalsService.getUserTotalSpendings(), HttpStatus.OK);
    }

    @GetMapping("/totalSpendings/{yearMonth}")
    public ResponseEntity<BigDecimal> getUserTotalMonthSpendings(@PathVariable String yearMonth) {
        return new ResponseEntity<BigDecimal>(totalsService.getUserTotalMonthSpendings(yearMonth), HttpStatus.OK);
    }

    @GetMapping("/totalIncome")
    public ResponseEntity<BigDecimal> getUserTotalIncome() {
        return new ResponseEntity<BigDecimal>(totalsService.getUserTotalIncome(), HttpStatus.OK);
    }

    @GetMapping("/totalIncome/{yearMonth}")
    public ResponseEntity<BigDecimal> getUserTotalMonthIncome(@PathVariable String yearMonth) {
        return new ResponseEntity<BigDecimal>(totalsService.getUserTotalMonthIncome(yearMonth), HttpStatus.OK);
    }

    @GetMapping("/balance")
    public ResponseEntity<BigDecimal> getUserBalance() {
        return new ResponseEntity<BigDecimal>(totalsService.getUserBalance(), HttpStatus.OK);
    }

    @GetMapping("/category/{categoryId}/total/{yearMonth}")
    public ResponseEntity<BigDecimal> getTransactionsMonthTotal(@PathVariable Long categoryId,
            @PathVariable String yearMonth) {
        return new ResponseEntity<BigDecimal>(totalsService.getTransactionsYearMonthCategoryTotal(categoryId, yearMonth),
                HttpStatus.OK);
    }

}
