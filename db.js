// const mysql = require("mysql");
// require("dotenv").config();
// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "akhilmysqlserver.mysql.database.azure.com", // ✅ your Azure server hostname
//   user: "akhiladmin", // ✅ full user format required by Azure
//   password: "cricket@1", // 🔑 use the one you set while creating the server
//   database: "cricket_cms", // ✅ database you created earlier

// });

// pool.getConnection((err, conn) => {
//   if (err) {
//     console.error("MySQL Connection Failed:", err);
//   } else {
//     console.log("✅ Connected to Azure MySQL successfully!");
//     conn.release();
//   }
// });

// const mysql = require("mysql");
// require("dotenv").config(); // Load env values

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   ssl: {
//     rejectUnauthorized: true, // 🔐 Required for Azure MySQL
//   },
// });

// pool.getConnection((err, conn) => {
//   if (err) {
//     console.error("MySQL Connection Failed:", err);
//   } else {
//     console.log("✅ Connected to Azure MySQL successfully!");
//     conn.release();
//   }
// });

// const mysql = require("mysql");

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "Akhil1",
//   password: "Akhil1",
//   database: "cricket_cms",
// });

// module.exports = pool;

const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error(" MySQL connection failed:", err.message);
  } else {
    console.log(" MySQL connected successfully");
    connection.release();
  }
});

module.exports = pool;
