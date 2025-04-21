const axios = require("axios");
const mysql = require("mysql2/promise");
require("dotenv").config(); // ✅ Load from .env

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Function to fetch live scores from CricAPI
async function fetchLiveScores() {
  try {
    const response = await axios.get(
      "https://api.cricapi.com/v1/currentMatches?apikey=65d57f73-0a3a-47d5-88fc-fc8390a378c9&offset=0"
    );
    return response.data.data; // Return the data array
  } catch (error) {
    console.error("Error fetching live scores:", error);
    throw new Error("Failed to fetch live scores");
  }
}

// Function to fetch players list from CricAPI
async function fetchPlayers() {
  try {
    const response = await axios.get(
      "https://api.cricapi.com/v1/players?apikey=65d57f73-0a3a-47d5-88fc-fc8390a378c9&offset=0"
    );
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching players list:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch players list");
  }
}

// Function to get user data from database
function getUserData(userId) {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM Users WHERE id = ?", [userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

// Function to get match data from database
function getMatchData(matchId) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM Matches WHERE id = ?",
      [matchId],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
}

module.exports = {
  fetchLiveScores,
  fetchPlayers,
  getUserData,
  getMatchData,
};
