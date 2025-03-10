-- Create Database
CREATE DATABASE todo_db;
USE todo_db;

-- Users Table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks Table
CREATE TABLE Tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    due_date DATE,
    difficulty ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO Users (email, password) VALUES ('user@example.com', 'hashed_password');

INSERT INTO Tasks (user_id, title, due_date, difficulty)
VALUES
    (1, 'Complete Assignment', '2025-03-14', 'High'),
    (1, 'Grocery Shopping', '2025-03-12', 'Medium');
