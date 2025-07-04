# 🏥 Hospital Management System

A full-stack Hospital Management System built with **Spring Boot** and **Angular**, featuring role-based access, appointment scheduling, and secure JWT-based authentication.

---

## 🚀 Tech Stack

| Layer       | Technology                      |
|-------------|----------------------------------|
| Frontend    | Angular, Bootstrap               |
| Backend     | Spring Boot (Java), Spring Security |
| Database    | Oracle (with JPA/Hibernate)      |
| Auth        | JWT (JSON Web Tokens)            |

---

## 👥 User Roles

- **Admin**: Manages doctors, patients, and appointments.
- **Patient**: Registers, logs in, and books appointments.

---

## 🧩 Features

### 🧑‍⚕️ Patient
- Register/login with phone number and email verification
- Upload identification documents (with file validation)
- Book appointments

### 👨‍💼 Admin
- View/manage all users
- Cancel/approve appointments

---

## 🔐 Authentication & Security

- JWT-based login
- Route guards in Angular
- Role-based access control in backend
- Passwords securely encrypted

---

## 🖼️ UI/UX

- Built with Angular + Bootstrap
- Responsive and mobile-friendly
- Lazy-loaded routes and route guards
- File input validation and preview

---

## ⚙️ How to Run

### 🔧 Backend (Spring Boot)

1. Clone the repository
2. Configure Oracle DB in `application.properties`
3. Run the app:
   ```bash
   ./mvnw spring-boot:run
