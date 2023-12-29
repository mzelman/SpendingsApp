package com.mz.spendingsapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mz.spendingsapp.entity.Income;

public interface IncomeRepository extends JpaRepository<Income, Long> {

        public List<Income> findAllByUserUsername(String Username, Sort sort);

        public Optional<Income> findByIdAndUserUsername(Long incomeId, String username);

        @Query(value = "SELECT *\r\n" + //
                        "FROM income\r\n" + //
                        "WHERE TO_CHAR(date_created, 'YYYY-MM') = :yearMonth\r\n" + //
                        "AND user_id = :userId\r\n" +
                        "ORDER BY id ASC", nativeQuery = true)
        List<Income> findAllByYearMonthCreatedAndUserId(@Param("yearMonth") String yearMonth,
                        @Param("userId") Long userId);

}
