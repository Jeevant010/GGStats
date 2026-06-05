const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const esportsRoutes = require('./esports.routes');
const tournamnetRoutes = require('./tournament.routes');

router.get("/", (req, res) => {
    res.json({
        status: "OK",
        message: "GGStats API is running",
        timestamp: new Date()
    });
});

router.use('/api/auth', authRoutes);
router.use('/api/esports', esportsRoutes);
router.use('/api/tournaments', tournamnetRoutes);

module.exports = router;
