# Cricket CMS API

## Overview
This project is a Cricket CMS API that allows users to register, log in, create articles, fetch live cricket scores, and more.

## Setup Instructions

### Prerequisites
- Node.js (version 14.x or higher)
- MySQL (version 8.x or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cricket-cms-api.git
   cd cricket-cms-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   ACCESS_TOKEN_SECRET=your_access_token_secret
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=cricket_cms
   ```

4. Set up the MySQL database:
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
1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000/api-docs` to view the API documentation.

### Testing
You can use tools like Postman or cURL to test the API endpoints. The API documentation provides example requests and responses for each endpoint.

## API Documentation
The API documentation is available at `http://localhost:3000/api-docs`.
