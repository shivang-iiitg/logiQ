const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const pool = require('../db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const [existingUser] = await pool.query("SELECT * FROM Student WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const studentId = uuidv4();

        await pool.query("INSERT INTO Student (id, name, email, password_hash) VALUES (?, ?, ?, ?)", 
                         [studentId, name, email, hashedPassword]);

        res.json({ message: "Signup successful", studentId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const [users] = await pool.query("SELECT * FROM Student WHERE name = ?", [username]);
        if (users.length === 0) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user.id, email: user.email , username: user.name }, JWT_SECRET);

        res.json({ message: "Login successful", token , student_id: user.id});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
