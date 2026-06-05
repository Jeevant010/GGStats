const { Tournament } = require('../models');


const getTournaments = async (req, res) => {
    try {
        let tournament = await Tournament.find({}).sort({ startDate: 1 });

        if (tournament.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tournaments found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Tournament data fetched successfully",
            data: tournament
        });

    } catch (error) {
        console.log("Tournament fetch error: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
module.exports = {
    getTournaments
};

