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
in my project i am using mysql workbench
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



DOCUMENTATION:
2.	Documentation:

Testing all the endpoints of Rest API and Graphql
i. Rest API endpoints using swagger:
 
![Screenshot 2025-03-31 204910](https://github.com/user-attachments/assets/662561e1-2020-40eb-9ce2-21743fa5ce05)

 

Registering new user:
 
 
new users created successfully.


Login :
 

 





Graphql endpoints:
creating a New Article:

 
Fetching Live scores:
 




Database Schema Diagram:
 



3.  Demonstration:

4. Report:
i.	Design Decisions and Justifications:
Architecture:
 The system adopts a microservices architecture structure because this approach provides both scalability and maintenance capabilities alongside separation of important system components. Both REST and GraphQL APIs function together in the system to give users flexible ways for querying and manipulating data. The system implements REST API for typical CRUD operations yet utilizes GraphQL for executing advanced data retrieval and complex data fetching tasks. The system implements Node.js as its web server because its event-driven structure supports high efficiency during concurrent request operations.
        Database: 
MySQL serves as the relational database because of its excellent power combined with its capacity for scale and its ability to handle sophisticated queries and transactions. The schema does include three main tables which comprise users, articles and likes.
 Integration with Third-Party Services: 
A third-party cricket scores API through integration will enable the system to obtain real-time scores and updates.
ii.	Challenges Encountered and Solutions Implemented:
API Rate Limiting: The third-party cricket scores API enforces rate limits as a challenge for the system. The system will benefit from two strategies that include API call reduction through caching and rate limiting for request management.
 Scalability: The system encounters difficulties as it needs to adapt to support large quantities of simultaneous users. The application benefits from distributed traffic using load balancers together with horizontal scalability through deploying docker containers.
iii.	Performance Analysis and Optimization Strategies 
Database Optimization: 
Database performance improves when indexes are created for fields which are frequently used in database queries. A database analysis determines SQL queries for performance enhancement which decreases overall execution duration.
 Caching: The application uses Redis to perform In-Memory Caching of popular data which decreases database operations and accelerates system responses. 
Load Testing: Load testing can be performed through JMeter and Locust tools for the purpose of identifying performance bottlenecks. The process of server configuration refinement accompanies code optimization which makes systems handle heavier loads efficiently.
iv.	Security Considerations and Implementations
 Authentication and Authorization: JWT: Using JSON Web Tokens (JWT) for secure authentication and authorization of users. The system will use role-based access control (RBAC) methodology for ensuring authorized endpoint access depends on user roles. 
Data Encryption: The API protects data transmission through HTTPS which delivers encryption services. Users receive secure data protection through REST-based AES encryption for their data when it rests on system storage facilities. 

API Security: We need to deploy rate limiting as a security measure to stop denial-of-service (DoS) attacks and abuse of service. API security implements a process to validate user data entry and apply code sanitization for blocking SQL injection along with other security threats.
v.	Future Improvements:
Live Match Videos: Users should have the ability to access live cricket match videos streamed directly on the platform.
 User Chat: The platform must allow users to communicate with each other through live matches to enhance their real-time interaction.

