const { getCS2Matches } = require('../services/esports.service');

// GET /api/esports/cs2
// Fetches upcoming and live CS2 matches using the HLTV package
const getMatches = async (req, res) => {
    try {
        const data = await getCS2Matches();

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        console.error("Error fetching HLTV matches:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch CS2 matches"
        });
    }
};

module.exports = { getMatches };
