package com.mz.spendingsapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mz.spendingsapp.entity.Income;
import com.mz.spendingsapp.repository.IncomeRepository;

import com.mz.spendingsapp.exception.EntityNotFoundException;

@Service
public class IncomeServiceImpl implements IncomeService {

    @Autowired
    IncomeRepository incomeRepository;

    @Autowired
    UserService userService;

    @Override
    public Income getIncome(Long incomeId) {
        return unwrap(incomeRepository.findByIdAndUserUsername(incomeId, userService.getCurrentUserUsername()));
    }

    @Override
    public List<Income> listUserIncomes() {
        return incomeRepository.findAllByUserUsername(userService.getCurrentUserUsername(), Sort.by("id"));
    }

    public List<Income> listUserYearMonthIncomes(String yearMonth) {
        return incomeRepository.findAllByYearMonthCreatedAndUserId(yearMonth, userService.getCurrentUser().getId());
    }

    @Override
    public void saveIncome(Income income) {
        income.setUser(userService.getCurrentUser());
        incomeRepository.save(income);
    }

    @Override
    public void deleteIncome(Long incomeId) {
        getIncome(incomeId);
        incomeRepository.deleteById(incomeId);
    }

    static Income unwrap(Optional<Income> income) {
        return income.orElseThrow(() -> new EntityNotFoundException(Income.class));
    }

}
