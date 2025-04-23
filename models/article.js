const pool = require("../db");

// Function to create an article
async function createArticle(title, content, userId) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO articles (title, content, user_id) VALUES (?, ?, ?)",
      [title, content, userId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.insertId);
      }
    );
  });
}

// Function to update an article
async function updateArticle(id, title, content) {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE articles SET title = ?, content = ? WHERE id = ?",
      [title, content, id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.affectedRows === 0) {
          return resolve(null);
        }
        resolve({ id, title, content });
      }
    );
  });
}

// Function to delete an article
async function deleteArticle(id) {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM articles WHERE id = ?", [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.affectedRows === 0) {
        return resolve(false);
      }
      resolve(true);
    });
  });
}

// Function to get all articles
async function getAllArticles() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM articles", (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

// Function to get an article by ID
async function getArticleById(id) {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM articles WHERE id = ?", [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length === 0) {
        return resolve(null);
      }
      resolve(results[0]);
    });
  });
}

// Function to like an article
async function likeArticle(userId, articleId) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO Likes (user_id, article_id) VALUES (?, ?)",
      [userId, articleId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.insertId);
      }
    );
  });
}

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  likeArticle,
};
