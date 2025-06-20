  const jwt = require("jsonwebtoken");

  const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Expect "Bearer TOKEN"
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
      const decoded = jwt.verify(token, "secretkey");
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  };

  module.exports = authMiddleware;
