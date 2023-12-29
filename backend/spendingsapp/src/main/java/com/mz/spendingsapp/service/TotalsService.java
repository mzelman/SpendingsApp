package com.mz.spendingsapp.service;

import java.math.BigDecimal;

public interface TotalsService {
    
    public BigDecimal getUserTotalIncome();

    public BigDecimal getUserTotalMonthIncome(String yearMonth);

    public BigDecimal getUserTotalSpendings();

    public BigDecimal getUserTotalMonthSpendings(String yearMonth);

    public BigDecimal getUserBalance();

    public BigDecimal getTransactionsYearMonthCategoryTotal(Long categoryId, String yearMonth);

}
