const mysql = require("mysql");
require("dotenv").config();
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "akhilmysqlserver.mysql.database.azure.com", // ✅ your Azure server hostname
  user: "akhiladmin", // ✅ full user format required by Azure
  password: "cricket@1", // 🔑 use the one you set while creating the server
  database: "cricket_cms", // ✅ database you created earlier
  ssl: {
    rejectUnauthorized: true, // ✅ required for secure Azure connection
  },
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error("MySQL Connection Failed:", err);
  } else {
    console.log("✅ Connected to Azure MySQL successfully!");
    conn.release();
  }
});

module.exports = pool;
