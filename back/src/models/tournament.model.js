const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    sport: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return !this.startDate || value > this.startDate;
            },
            message: "End date must be after start date."
        }
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    tags: [{
        type: String,
    }]
}, {
    timestamps: true
});

const Tournament = mongoose.model('Tournament', tournamentSchema);
module.exports = Tournament;