# logiQ - Online Quiz and Exam Portal

logiQ is a web-based platform for students to take quizzes and exams. The project is built using **React with TypeScript (frontend)** and **Express.js with JavaScript and MySQL (backend)**.

## Project Structure
```
logiQ/
├── frontend/     # React (TypeScript) frontend
│   ├── src/      # Source code
│   ├── components/ # UI components
├── backend/      # Express.js (JavaScript) backend
│   ├── routes/   # API routes
│   ├── .env      # Environment variables (modify as needed)
├── mySQL/        # Database schema and data
```

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v18+ recommended)
- MySQL Server
- npm (comes with Node.js)

---

## Setting Up the Project

### 1. Clone the Repository
```sh
git clone https://github.com/shivang-iiitg/logiQ
cd logiQ
```

### 2. Setup MySQL Database

#### Import the Database
1. Open MySQL and create a new database:
```sh
mysql -u your_username -p -e "CREATE DATABASE logiq_db;"
```
2. Import the SQL data from the `mySQL/` folder:
```sh
mysql -u your_username -p logiq_db < mySQL/db_dump.sql
```

---

## Running the Application

### 3. Configure the Backend
Before running the backend, modify the `.env` file in the `backend/` folder to match your system settings:
```sh
DB_HOST=your_database_host
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=logiq_db
```

### 4. Start the Backend Server
```sh
cd backend
npm install
npm run dev
```
The backend will start at `http://localhost:3000`

### 5. Start the Frontend
```sh
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`

---

## Features
- User authentication (sign up & login)
- Take quizzes with different difficulty levels
- Track marks and progress
- Built with React (TypeScript), Tailwind, Express.js (JavaScript), and MySQL

---

## Contributor
- [Shivang Sharma](https://github.com/shivang-iiitg)

Keep building, keep improving—one line of code at a time.
