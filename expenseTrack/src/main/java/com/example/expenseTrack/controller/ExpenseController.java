package com.example.expenseTrack.controller;

import com.example.expenseTrack.model.Expense;
import com.example.expenseTrack.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
    }

    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) {
        try {
            return expenseService.createExpense(expense);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create expense: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        return expenseService.updateExpense(id, expense);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }

    @GetMapping("/by-category/{category}")
    public List<Expense> getExpensesByCategory(@PathVariable String category) {
        // This method assumes you have a method in ExpenseService to handle this
        return expenseService.getExpensesByCategory(category);
    }
   
    
    

    
}
