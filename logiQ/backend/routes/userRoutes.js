const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../db");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const JWT_SECRET = process.env.JWT_SECRET;
  
  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
}

router.get("/user/marks", authenticateToken, async (req, res) => {
    try {
      const [user] = await pool.query("SELECT marks FROM Student WHERE id = ?", [req.user.id]);
      
      if (!user || user.length === 0) return res.status(404).json({ message: "User not found" });
  
      res.json({ marks: user[0].marks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
