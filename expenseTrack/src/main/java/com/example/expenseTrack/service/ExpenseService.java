package com.example.expenseTrack.service;

import com.example.expenseTrack.model.Expense;
import com.example.expenseTrack.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }

    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Long id, Expense expenseDetails) {
        return expenseRepository.findById(id).map(expense -> {
            expense.setTitle(expenseDetails.getTitle());
            expense.setAmount(expenseDetails.getAmount());
            expense.setDate(expenseDetails.getDate());
            return expenseRepository.save(expense);
        }).orElseThrow(() -> new RuntimeException("Expense not found"));
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    public List<Expense> getExpensesByCategory(String category) {
        // This method assumes you have a method in ExpenseRepository to handle this
        return expenseRepository.findByCategory(category);
    }
    
}
