# 💰 Expense Tracker – Full Stack Web Application

 **Expense Tracker** is a full stack web application built to help users manage and track their daily expenses efficiently with **real-time calculations, category-wise tracking, and report generation**.

---

## ✨ Key Features

- **CRUD Operations** – Add, update, delete, and view expenses seamlessly  
- **Category-wise Expense Tracking** – Organize expenses under Food, Travel, Rent, Utilities, etc.  
- **Date-wise Filtering** – Filter expenses by specific dates or ranges  
- **Real-time Expense Calculation** – Automatic total expense updates  
- **Dashboard View** – Visual summary of expenses for quick insights  
- **Excel Export** – Download expense data in Excel format for reporting and analysis  

---

## 🛠️ Tech Stack

### 🔹 Frontend
- HTML5  
- CSS3  
- JavaScript  

### 🔹 Backend
- Java  
- Spring Boot  
- RESTful APIs  
- Hibernate  
- Spring Data JPA  

### 🔹 Database
- MySQL  

---

## 🏗️ Project Architecture

- **Controller Layer** – Handles API requests  
- **Service Layer** – Contains business logic  
- **Repository Layer** – Manages database interactions  
- **Database** – MySQL  

---

## 🚀 Highlights

- Implemented **RESTful API design principles** following **MVC architecture**  
- Used **Spring Data JPA & Hibernate** for efficient ORM and database interactions  
- Ensured **clean code structure** with proper separation of concerns  
- Designed for **scalability, maintainability, and real-world usage**  

---

## 📌 Use Cases

- Personal expense tracking  
- Budget monitoring  
- Financial reporting  
- Learning real-world **Spring Boot backend development**

## 📸 Screenshots

<img width="1888" height="867" alt="Screenshot 2026-02-09 162034" src="https://github.com/user-attachments/assets/967edce9-17ce-4aad-98b0-00eb300075e8" />

<img width="1713" height="834" alt="Screenshot 2026-02-09 162132" src="https://github.com/user-attachments/assets/44958cae-848a-4c94-aa62-48ba6b559b28" />


## ⚙️ Installation & Setup

# 🖥️ Prerequisites

- Java 17 or later
- Maven
- MySQL
- Git
- Any IDE (IntelliJ / Eclipse / VS Code)

##⚙️ Backend Setup (Spring Boot)
1. Clone the repository  
   git clone https://github.com/Deepakkumar095/expense-Tracker.git

2. Configure MySQL database  
   - Create database `expense_tracker`
   - Update `application.properties`

3. Run the application  
   mvn spring-boot:run
   or
   Backend will run at: http://localhost:4000

## 📡 API Endpoints

| Method | Endpoint            | Description          |
|------|---------------------|----------------------|
| GET  | /api/expenses       | Get all expenses     |
| POST | /api/expenses       | Add new expense      |
| PUT  | /api/expenses/{id}  | Update expense       |
| DELETE | /api/expenses/{id} | Delete expense       |

## 🧪 Testing

- Unit testing for service layer
- API testing using Postman

## 🔮 Future Enhancements

- User authentication with JWT
- Monthly & yearly analytics
- Cloud deployment (AWS / Azure)

