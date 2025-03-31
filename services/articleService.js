const pool = require('../db');
const axios = require('axios');

// Function to fetch live scores from a third-party API
async function fetchLiveScores() {
  try {
    const response = await axios.get('https://api.cricapi.com/v1/currentMatches?apikey=65d57f73-0a3a-47d5-88fc-fc8390a378c9&offset=0');
    return response.data.data; // Ensure that the function returns an array of live scores
  } catch (error) {
    console.error('Error fetching live scores:', error.message, error.response && error.response.data);
    throw new Error('Failed to fetch live scores');
  }
}

// Function to fetch players list from a third-party API
async function fetchPlayers() {
  try {
    const response = await axios.get('https://api.cricapi.com/v1/players?apikey=65d57f73-0a3a-47d5-88fc-fc8390a378c9&offset=0');
    return response.data.data; // Ensure that the function returns an array of players
  } catch (error) {
    console.error('Error fetching players list:', error.message, error.response && error.response.data);
    throw new Error('Failed to fetch players list');
  }
}

// Function to get all articles from the database
async function getAllArticles() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM Articles', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

// Function to get aggregated data for the homepage
async function getHomePageData() {
  try {
    const [articles, liveScores, players] = await Promise.all([
      getAllArticles(),
      fetchLiveScores(),
      fetchPlayers(),
    ]);
    return {
      articles,
      liveScores,
      players,
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    throw new Error('Failed to fetch home page data');
  }
}

module.exports = {
  getHomePageData,
  fetchLiveScores,
  fetchPlayers,
  getAllArticles,
};