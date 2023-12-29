package com.mz.spendingsapp.service;

import java.util.List;

import com.mz.spendingsapp.entity.Income;

public interface IncomeService {

        public Income getIncome(Long incomeId);

        public List<Income> listUserIncomes();

        public List<Income> listUserYearMonthIncomes(String yearMonth);

        public void saveIncome(Income income);

        public void deleteIncome(Long incomeId);

}
