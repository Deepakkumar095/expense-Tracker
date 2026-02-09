package com.example.expenseTrack.repository;


import com.example.expenseTrack.model.Expense;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByCategory(String category);



}
