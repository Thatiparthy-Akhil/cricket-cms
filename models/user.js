const pool = require('../db');
const bcrypt = require('bcryptjs');

async function registerUser(name, email, password, role) {
  // Hash the password before saving to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    // Check if the email already exists
    pool.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length > 0) {
        return reject(new Error('Email already exists'));
      }

      // Insert the new user if the email does not exist
      pool.query(
        'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results.insertId);
        }
      );
    });
  });
}

async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM Users WHERE email = ?',
      [email],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      }
    );
  });
}

async function getAllUsers() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM Users', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
};