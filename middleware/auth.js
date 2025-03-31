const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Auth Header:', authHeader); // Debug statement
  console.log('Token:', token); // Debug statement

  if (token == null) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err); // Debug statement
      return res.sendStatus(403); // Invalid token, forbidden
    }
    req.user = user;
    console.log('Authenticated User:', user); // Debug statement
    next();
  });
}

module.exports = authenticateToken;