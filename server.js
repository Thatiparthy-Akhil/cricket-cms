const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const cors = require("cors"); // Import CORS middleware
const { fetchLiveScores, fetchPlayers } = require("./services/articleService");
const { getUserData } = require("./services");

const { registerUser, getUserByEmail, getAllUsers } = require("./models/user");
const {
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
  likeArticle,
} = require("./models/article");
const authenticateToken = require("./middleware/auth");
const checkAdmin = require("./middleware/checkAdmin");
const pool = require("./db");

// Create an Express app
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
// Middleware to parse JSON bodies
app.use(bodyParser.json());

const allowedOrigins = [
  "http://localhost:5173", // your local React frontend
  "https://cricket-cms.up.railway.app", // Swagger UI hosted on Railway
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Swagger UI setup
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const swaggerDocument = YAML.load(path.join(__dirname, "openapi.yaml")); // ✅ Corrected path

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Simple root route to test if the server is running
app.get("/", (req, res) => {
  res.send("Welcome to the Cricket CMS API!");
});

// Authentication routes
app.post("/auth/register", async (req, res) => {
  console.log("Received registration request");
  const { name, email, password, role } = req.body;
  try {
    const userId = await registerUser(name, email, password, role);
    console.log("User registered successfully:", userId);
    res.status(201).json({ id: userId, name, email, role });
  } catch (error) {
    console.error("Error registering user:", error);
    if (error.message === "Email already exists") {
      res.status(409).send("Email already exists");
    } else {
      res.status(500).send("Error registering user");
    }
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid email or password");
    }
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ accessToken });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
});

// Secure existing endpoints
app.get("/users", authenticateToken, (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  console.log("Fetching users with limit:", limit, "and offset:", offset);

  const startTime = Date.now(); // Log start time

  // Set a timeout for the query
  pool.query(
    "SELECT * FROM Users LIMIT ? OFFSET ?",
    [parseInt(limit), offset],
    (err, results) => {
      const endTime = Date.now(); // Log end time
      console.log("Time taken to execute query:", endTime - startTime, "ms");

      if (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching users");
        return;
      }

      console.log("Successfully fetched users:", results); // Debug statement
      res.json(results);
    }
  );
});

app.post("/users", authenticateToken, (req, res) => {
  const { name, email, role } = req.body;
  pool.query(
    "INSERT INTO Users (name, email, role) VALUES (?, ?, ?)",
    [name, email, role],
    (err, results) => {
      if (err) {
        console.error("Error creating user:", err);
        res.status(500).send("Error creating user");
        return;
      }
      res.status(201).json({ id: results.insertId, name, email, role });
    }
  );
});

// Get User by ID
app.get("/users/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM Users WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      res.status(500).send("Error fetching user");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.json(results[0]);
  });
});

// Update User Information
app.put("/users/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  pool.query(
    "UPDATE Users SET name = ?, email = ?, role = ? WHERE id = ?",
    [name, email, role, id],
    (err, results) => {
      if (err) {
        console.error("Error updating user:", err);
        res.status(500).send("Error updating user");
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send("User not found");
        return;
      }
      res.send("User updated successfully");
    }
  );
});

// Delete User
app.delete("/users/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM Users WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error deleting user:", err);
      res.status(500).send("Error deleting user");
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.send("User deleted successfully");
  });
});

// Fetch Live Scores
app.get("/live-scores", authenticateToken, async (req, res) => {
  try {
    const liveScores = await fetchLiveScores();
    res.json(liveScores);
  } catch (error) {
    console.error("Error fetching live scores:", error);
    res.status(500).send("Error fetching live scores");
  }
});

// Fetch Players List
app.get("/players", authenticateToken, async (req, res) => {
  try {
    const players = await fetchPlayers();
    res.json(players);
  } catch (error) {
    console.error("Error fetching players list:", error);
    res.status(500).send("Error fetching players list");
  }
});

// Get User Data
app.get("/user-data", authenticateToken, async (req, res) => {
  try {
    console.log("Fetching user data for user ID:", req.user.id); // Debug statement
    const userData = await getUserData(req.user.id);
    console.log("Fetched user data:", userData); // Debug statement
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Error fetching user data");
  }
});

// Create Article (Admin only)
app.post("/articles", authenticateToken, checkAdmin, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  try {
    const articleId = await createArticle(title, content, userId);
    res.status(201).json({ id: articleId, title, content, userId });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).send("Error creating article");
  }
});

// Update Article (Admin only)
app.put("/articles/:id", authenticateToken, checkAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedArticle = await updateArticle(id, title, content);
    if (!updatedArticle) {
      return res.status(404).send("Article not found");
    }
    res.json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).send("Error updating article");
  }
});

// Delete Article (Admin only)
app.delete("/articles/:id", authenticateToken, checkAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteArticle(id);
    if (!deleted) {
      return res.status(404).send("Article not found");
    }
    res.send("Article deleted successfully");
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).send("Error deleting article");
  }
});

// Get all articles
app.get("/articles", authenticateToken, async (req, res) => {
  try {
    const articles = await getAllArticles();
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).send("Error fetching articles");
  }
});

// Like an article
app.post("/articles/:id/like", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    await likeArticle(userId, id);
    res.send("Article liked successfully");
  } catch (error) {
    console.error("Error liking article:", error);
    res.status(500).send("Error liking article");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

console.log("✅ Swagger loaded at /api-docs");
