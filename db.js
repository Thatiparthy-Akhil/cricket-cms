const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'Akhil1',
  password: 'Akhil1',
  database: 'cricket_cms'
});

module.exports = pool;