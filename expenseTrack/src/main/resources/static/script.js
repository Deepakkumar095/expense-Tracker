const API_BASE_URL = 'http://localhost:4000/api/expenses';
let expenses = [];
let chart = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
    document.getElementById('date').valueAsDate = new Date();
});

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Load expenses
async function loadExpenses() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch expenses');
        
        expenses = await response.json();
        displayExpenses(expenses);
        updateDashboard(expenses);
        renderChart(expenses);
    } catch (error) {
        showNotification('Error loading expenses: ' + error.message, 'error');
    }
}

// Display expenses
function displayExpenses(expensesToShow) {
    const container = document.getElementById('expensesList');
    
    if (expensesToShow.length === 0) {
        container.innerHTML = `
            <div class="loading">
                <i class="fas fa-receipt" style="font-size: 2rem; margin-bottom: 10px;"></i>
                <h3>No expenses found</h3>
                <p>Add your first expense to get started</p>
            </div>
        `;
        return;
    }

    container.innerHTML = expensesToShow.map(expense => `
        <div class="expense-item">
            <div class="expense-info">
                <div class="expense-title">${expense.title}</div>
                <div class="expense-meta">
                    <span class="category-tag">${getCategoryIcon(expense.category || 'other')} ${expense.category || 'Other'}</span>
                    <span>${new Date(expense.date).toLocaleDateString()}</span>
                </div>
                <div class="expense-description">${expense.description || 'No description'}</div>
            </div>
            <div>
                <div class="expense-amount">₹${expense.amount.toFixed(2)}</div>
                <div class="expense-actions">
                    <button class="action-btn edit-btn" onclick="editExpense(${expense.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteExpense(${expense.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Search functionality
function searchExpenses() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = expenses.filter(expense => 
        expense.title.toLowerCase().includes(searchTerm) ||
        (expense.description && expense.description.toLowerCase().includes(searchTerm)) ||
        (expense.category && expense.category.toLowerCase().includes(searchTerm))
    );
    displayExpenses(filtered);
}

// Chart rendering
function renderChart(expenses) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    
    if (chart) {
        chart.destroy();
    }

    // Group by category
    const categories = {};
    expenses.forEach(expense => {
        const category = expense.category || 'other';
        categories[category] = (categories[category] || 0) + expense.amount;
    });

    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: Object.keys(categories).map(getCategoryColor),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Utility functions
function getCategoryColor(category) {
    const colors = {
        food: '#ff6b6b',
        transport: '#4ecdc4',
        shopping: '#45b7d1',
        entertainment: '#96ceb4',
        bills: '#feca57',
        health: '#ff9ff3',
        other: '#54a0ff'
    };
    return colors[category] || '#54a0ff';
}

function getCategoryIcon(category) {
    const icons = {
        food: '🍽️',
        transport: '🚗',
        shopping: '🛍️',
        entertainment: '🎬',
        bills: '📄',
        health: '🏥',
        other: '📦'
    };
    return icons[category] || '📦';
}






// Export to Excel
function exportToExcel() {
    if (expenses.length === 0) {
        showNotification('No expenses to export', 'info');
        return;
    }

    // Prepare data for Excel
    const headers = ['Title', 'Amount', 'Category', 'Date'];
    const data = expenses.map(expense => [
        expense.title,
        expense.amount,
        expense.category || 'other',
        expense.date,
        expense.description || ''
    ]);

    // Add headers at the top
    const worksheetData = [headers, ...data];

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    // Export to Excel file
    XLSX.writeFile(workbook, `expenses-${new Date().toISOString().split('T')[0]}.xlsx`);

    showNotification('Expenses exported to Excel successfully!', 'success');
}


// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Form handling
document.getElementById('expenseForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const expenseData = {
        title: document.getElementById('title').value,
        amount: parseFloat(document.getElementById('amount').value),
        category: document.getElementById('category').value,
        date: document.getElementById('date').value,
       
    };

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData)
        });

        if (response.ok) {
            closeModal('addExpenseModal');
            this.reset();
            document.getElementById('date').valueAsDate = new Date();
            loadExpenses();
            showNotification('Expense added successfully!', 'success');
        } else {
            throw new Error('Failed to add expense');
        }
    } catch (error) {
        showNotification('Error adding expense: ' + error.message, 'error');
    }
});

// Update dashboard
function updateDashboard(expenses) {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const monthlyTotal = calculateMonthlyTotal(expenses);

    document.getElementById('totalExpenses').textContent = `₹${total.toFixed(2)}`;
    document.getElementById('monthlyExpense').textContent = `₹${monthlyTotal.toFixed(2)}`;
    document.getElementById('expensesCount').textContent = expenses.length;
}

function calculateMonthlyTotal(expenses) {
    const now = new Date();
    return expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() === now.getMonth() && 
                   expenseDate.getFullYear() === now.getFullYear();
        })
        .reduce((sum, expense) => sum + expense.amount, 0);
}

// Delete expense
async function deleteExpense(id) {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadExpenses();
            showNotification('Expense deleted successfully!', 'success');
        } else {
            throw new Error('Failed to delete expense');
        }
    } catch (error) {
        showNotification('Error deleting expense: ' + error.message, 'error');
    }
}

// Edit expense
async function editExpense(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch expense');
        
        const expense = await response.json();
        
        // Populate form with expense data
        document.getElementById('title').value = expense.title;
        document.getElementById('amount').value = expense.amount;
        document.getElementById('category').value = expense.category || 'other';
        document.getElementById('date').value = expense.date;
        
        
        // Change form to update mode
        const form = document.getElementById('expenseForm');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        const originalSubmit = form.onsubmit;
        
        form.onsubmit = async function(e) {
            e.preventDefault();
            await updateExpense(id);
            form.onsubmit = originalSubmit;
            submitBtn.textContent = 'Save Expense';
        };
        
        submitBtn.textContent = 'Update Expense';
        openModal('addExpenseModal');
        
    } catch (error) {
        showNotification('Error loading expense for editing: ' + error.message, 'error');
    }
}

async function updateExpense(id) {
    const expenseData = {
        title: document.getElementById('title').value,
        amount: parseFloat(document.getElementById('amount').value),
        category: document.getElementById('category').value,
        date: document.getElementById('date').value,
        description: document.getElementById('description').value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData)
        });

        if (response.ok) {
            closeModal('addExpenseModal');
            document.getElementById('expenseForm').reset();
            loadExpenses();
            showNotification('Expense updated successfully!', 'success');
        } else {
            throw new Error('Failed to update expense');
        }
    } catch (error) {
        showNotification('Error updating expense: ' + error.message, 'error');
    }
}