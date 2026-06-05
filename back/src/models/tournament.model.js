const mongoose = require("mongoose");

const tournamnentSchema = new mongoose.Schema({
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

const Tournament = mongoose.model('Tournament', tournamnentSchema);
module.exports = Tournament;