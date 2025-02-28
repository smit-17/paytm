const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const tokenString = req.headers.authorization;
  try {
    const decodeString = jwt.verify(tokenString, "Smit@1212");
    if (decodeString?.userId) {
      req.userId = decodeString?.userId;
      next();
    }
  } catch (e) {
    res.send(e);
  }
}

module.exports = authMiddleware;
