const express = require('express');
const router = express.Router();
const { HLTV } = require('hltv');

// GET /api/esports/cs2
// Fetches upcoming and live CS2 matches using the HLTV package
router.get('/cs2', async (req, res) => {
    try {
        // Fetch matches from HLTV
        const matches = await HLTV.getMatches();
        
        // We probably don't need to send back 100 matches to the frontend.
        // Let's send a reasonable amount (e.g. 50) heavily weighted toward today/live
        const limitedMatches = matches.slice(0, 50);

        res.status(200).json({
            success: true,
            data: limitedMatches
        });
    } catch (error) {
        console.error("Error fetching HLTV matches:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch CS2 matches",
            error: error.message
        });
    }
});

module.exports = router;
