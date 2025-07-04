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
- Trigger email notifications on appointment updates

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
3. Configure email settings:
   ```properties
   spring.mail.host=smtp.example.com
   spring.mail.port=587
   spring.mail.username=your-email@example.com
   spring.mail.password=your-password
   spring.mail.properties.mail.smtp.auth=true
   spring.mail.properties.mail.smtp.starttls.enable=true
   ```
4. Run the app:
   ```
   ./mvnw spring-boot:run
   ```

### 🌐 Frontend (Angular)
1. Navigate to the Angular project directory
2. Install dependencies:
   ```
   npm install
   ```
3. Run the app:
   ```
   ng serve
   ```
