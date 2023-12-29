package com.mz.spendingsapp.web;

import java.math.BigDecimal;
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

import com.mz.spendingsapp.entity.Income;
import com.mz.spendingsapp.service.IncomeService;
import com.mz.spendingsapp.service.TotalsService;

@RestController
@RequestMapping("/user/income")
@CrossOrigin(origins = "https://spendingsapp-frontend-production.up.railway.app/", maxAge = 3600, allowCredentials="true")
public class IncomeController {

    @Autowired
    IncomeService incomeService;

    @Autowired
    TotalsService totalsService;

    @GetMapping("/all")
    public ResponseEntity<List<Income>> listIncomes() {
        return new ResponseEntity<>(incomeService.listUserIncomes(), HttpStatus.OK);
    }

    @GetMapping("/all/{yearMonth}")
    public ResponseEntity<List<Income>> listYearMonthIncomes(@PathVariable String yearMonth) {
        return new ResponseEntity<>(incomeService.listUserYearMonthIncomes(yearMonth), HttpStatus.OK);
    }
    
    @PostMapping("/add")
    public ResponseEntity<HttpStatus> addIncome(@RequestBody Income income) {
        incomeService.saveIncome(income);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{incomeId}")
    public ResponseEntity<HttpStatus> deleteIncome(@PathVariable Long incomeId) {
        incomeService.deleteIncome(incomeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/total/{yearMonth}")
    public ResponseEntity<BigDecimal> getIncomeMonthTotal(@PathVariable String yearMonth) {
        return new ResponseEntity<BigDecimal>(totalsService.getUserTotalMonthIncome(yearMonth), HttpStatus.OK);
    }

}
