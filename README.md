# Cricket CMS API

## Overview
This project is a Cricket CMS API that allows users to register, log in, view articles, fetch live cricket scores, and more.

## Setup Instructions

### Prerequisites
- Node.js (version 14.x or higher)
- MySQL (version 8.x or higher)

### Installation

#### Step 1: Clone the Repository
1. Open your terminal or command prompt.
2. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/cricket-cms-api.git
   cd cricket-cms-api
   ```

#### Step 2: Install Dependencies
1. Ensure you are in the root directory of the cloned repository.
2. Install the required dependencies:
   ```bash
   npm install
   ```

#### Step 3: Create the `.env` File
1. In the root directory, create a new file named `.env`.
2. Add the following environment variables to the `.env` file:
   ```env
   ACCESS_TOKEN_SECRET=your_access_token_secret
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=cricket_cms
   ```

#### Step 4: Set Up the MySQL Database
1. Open your MySQL client (e.g., MySQL Workbench, phpMyAdmin, or command line).
in my project i am using my sql workbench
2. Run the following SQL commands to create the database and tables:
   ```sql
   CREATE DATABASE cricket_cms;
   USE cricket_cms;

   CREATE TABLE Users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     role VARCHAR(50) NOT NULL
   );

   CREATE TABLE Articles (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     content TEXT NOT NULL,
     user_id INT,
     FOREIGN KEY (user_id) REFERENCES Users(id)
   );

   CREATE TABLE Likes (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT,
     article_id INT,
     FOREIGN KEY (user_id) REFERENCES Users(id),
     FOREIGN KEY (article_id) REFERENCES Articles(id)
   );
   ```

### Running the Application

#### Step 1: Start the Server
1. Ensure you are in the root directory of the project.
2. Start the server:
   ```bash
   npm start
   ```

#### Step 2: Access the API Documentation
1. Open your web browser.
2. Navigate to `http://localhost:3000/api-docs` to view the API documentation.

### Testing

You can use tools like Postman or cURL to test the API endpoints. The API documentation provides example requests and responses for each endpoint.

## API Documentation

The API documentation is available at `http://localhost:3000/api-docs`.
