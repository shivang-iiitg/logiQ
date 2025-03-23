const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");



const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use("/api", userRoutes);

app.use("/api", quizRoutes);

app.use("/api", leaderboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
