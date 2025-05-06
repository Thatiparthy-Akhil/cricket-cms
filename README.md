# Cricket CMS API

## Overview
This project is a comprehensive Cricket Content Management System (CMS) API designed to support various user interactions related to cricket content. It allows users to register and log in securely, browse and manage cricket-related articles, and fetch real-time live scores using an external cricket API. The system also includes features for user role management, JWT-based authentication, and CRUD operations on content, making it a full-featured backend solution for cricket enthusiasts and content managers.

For Deployment I used Railway deployment:
GitHub Link: https://github.com/Thatiparthy-Akhil/cricket-cms.git
Deployment link: https://cricket-cms-production.up.railway.app
Swagger Documentation: https://cricket-cms-production.up.railway.app/api-docs/
I used Ultimate Cricket free API: 
For Live Scores:
https://api.cricapi.com/v1/currentMatches?apikey=1918ad5e-2eea-4641-a152-9af8df2644ba&offset=0
For Players: 
https://api.cricapi.com/v1/players?apikey=1918ad5e-2eea-4641-a152-9af8df2644ba&offset=0
Graphql:
i.	 http://localhost:3000/graphql
ii.	https://studio.apollographql.com/sandbox/explorer
FRONTEND:

For Frontend deployment I used Azure:
GitHub Link:  https://github.com/Thatiparthy-Akhil/cricket_frontend.git
Deployment Link: https://gray-cliff-08a709010.6.azurestaticapps.net


Testing all the endpoints of Rest API and Graphql
i. Rest API endpoints using swagger:
 
![Screenshot 2025-03-31 204910](https://github.com/user-attachments/assets/662561e1-2020-40eb-9ce2-21743fa5ce05)

 ![Screenshot 2025-03-31 205111](https://github.com/user-attachments/assets/14344eb8-bf6a-4ff1-bf1d-cffa18b4fe25)


Registering new user:
 
 ![Screenshot 2025-03-31 205226](https://github.com/user-attachments/assets/44889380-f888-4753-9ced-7c14fa139b52)

![Screenshot 2025-03-31 205904](https://github.com/user-attachments/assets/27d339ba-ba79-4c4d-a123-275969292777)


new users created successfully.
![Screenshot 2025-03-31 205935](https://github.com/user-attachments/assets/e4c13809-32e2-492c-b0ce-1438b809d4ce)


Login :
 ![Screenshot 2025-03-31 210544](https://github.com/user-attachments/assets/3a331eda-07cd-476f-86cf-dbd678cadd51)

![Screenshot 2025-03-31 210608](https://github.com/user-attachments/assets/d0511186-2517-4024-bdfa-99274d1032c8)



 





Graphql endpoints:
creating a New Article:

 ![Screenshot 2025-03-31 210840](https://github.com/user-attachments/assets/534b399b-2ed6-40f7-98fe-2f381c0deaf8)

Fetching Live scores:
 

![Screenshot 2025-03-31 210950](https://github.com/user-attachments/assets/336ad603-00a0-41a0-8175-001d6e303040)



Database Schema Diagram:
 
![Screenshot 2025-03-31 212611](https://github.com/user-attachments/assets/75dfc62c-85a5-4bd2-b45c-b7c0bb38e848)



 Database: 
MySQL serves as the relational database because of its excellent power combined with its capacity for scale and its ability to handle sophisticated queries and transactions. The schema does include three main tables which comprise users, articles and likes.


 Integration with Third-Party Services: 
A third-party cricket scores API through integration will enable the system to obtain real-time scores and updates.


ii.	Challenges Encountered and Solutions Implemented:
API Rate Limiting: The third-party cricket scores API enforces rate limits as a challenge for the system. The system will benefit from two strategies that include API call reduction through caching and rate limiting for request management.
 Scalability: The system encounters difficulties as it needs to adapt to support large quantities of simultaneous users. The application benefits from distributed traffic using load balancers together with horizontal scalability through deploying docker containers.


 


	Security Considerations and Implementations
 Authentication and Authorization: JWT: Using JSON Web Tokens (JWT) for secure authentication and authorization of users. The system will use role-based access control (RBAC) methodology for ensuring authorized endpoint access depends on user roles. 
Data Encryption: The API protects data transmission through HTTPS which delivers encryption services. Users receive secure data protection through REST-based AES encryption for their data when it rests on system storage facilities. 

API Security: We need to deploy rate limiting as a security measure to stop denial-of-service (DoS) attacks and abuse of service. API security implements a process to validate user data entry and apply code sanitization for blocking SQL injection along with other security threats.



Future Improvements:
Live Match Videos: Users should have the ability to access live cricket match videos streamed directly on the platform.
 User Chat: The platform must allow users to communicate with each other through live matches to enhance their real-time interaction.







