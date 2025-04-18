const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("Auth Header:", authHeader);
  console.log("Token:", token);

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.sendStatus(403);
    }
    req.user = user;
    console.log("Authenticated User:", user);
    next();
  });
}

module.exports = authenticateToken;
