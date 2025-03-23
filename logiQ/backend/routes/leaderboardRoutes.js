const express = require("express");
const router = express.Router();
const pool = require("../db"); 


router.get("/leaderboard", async (req, res) => {
    try {
      const [students] = await pool.query(
        "SELECT id, name, marks FROM student ORDER BY marks DESC"
      );
  
      res.json({ success: true, students });
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
 
module.exports = router;