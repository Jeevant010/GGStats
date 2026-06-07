const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const esportsRoutes = require('./esports.routes');
const tournamentRoutes = require('./tournament.routes');

router.get("/", (req, res) => {
    res.json({
        status: "OK",
        message: "GGStats API is running",
        timestamp: new Date()
    });
});

router.use('/api/auth', authRoutes);
router.use('/api/esports', esportsRoutes);
router.use('/api/tournaments', tournamentRoutes);

router.get("/api/news", async (req, res) => {
    try {
        const query = req.query.q || "Sport";
        const apiKey = process.env.NEWS_API_KEY || "";
        if (!apiKey) {
            console.error("NEWS_API_KEY environment variable is not defined");
            return res.status(500).json({ error: "News service is misconfigured (missing API key)" });
        }
        const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`);
        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (err) {
        console.error("Error fetching news from NewsAPI:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
