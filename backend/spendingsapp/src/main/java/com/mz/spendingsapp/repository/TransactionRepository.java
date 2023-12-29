package com.mz.spendingsapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.mz.spendingsapp.entity.Transaction;

@CrossOrigin(origins = "https://spendingsapp-frontend-production.up.railway.app/", maxAge = 3600, allowCredentials = "true")
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

        public Optional<Transaction> findByIdAndUserUsername(Long id, String username);

        public List<Transaction> findAllByUserId(Long userId, Sort sort);

        @Query(value = "SELECT *\r\n" + //
                        "FROM transactions\r\n" + //
                        "WHERE TO_CHAR(date_created, 'YYYY-MM') = :yearMonth\r\n" + //
                        "AND user_id = :userId\r\n" +
                        "ORDER BY id ASC", nativeQuery = true)
        List<Transaction> findAllByYearMonthCreatedAndUserId(@Param("yearMonth") String yearMonth,
                        @Param("userId") Long userId);

        @Query(value = "SELECT *\r\n" + //
                        "FROM transactions\r\n" + //
                        "WHERE TO_CHAR(date_created, 'YYYY-MM') = :yearMonth\r\n" + //
                        "AND category_id = :categoryId\r\n" +
                        "ORDER BY id ASC", nativeQuery = true)
        List<Transaction> findAllByYearMonthCreatedAndCategoryId(@Param("yearMonth") String yearMonth,
                        @Param("categoryId") Long categoryId);

}
