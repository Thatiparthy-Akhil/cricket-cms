function checkAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = checkAdmin;
