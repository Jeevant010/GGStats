const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const { Tournament } = require('../src/models');
const { mongoUri } = require('../src/config/env');

const sampleTournaments = [
    {
        title: "FIFA World Cup 2026",
        sport: "Soccer",
        startDate: new Date("2026-06-11T00:00:00Z"),
        endDate: new Date("2026-07-19T23:59:59Z"),
        location: "USA, Canada, Mexico",
        description: "The 23rd FIFA World Cup featuring 48 teams competing across 16 host cities in North America. The biggest soccer tournament in history.",
        coverImage: "https:/ss/images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
        tags: ["World Cup", "Soccer", "International"]
    },
    {
        title: "ICC Champions Trophy 2026",
        sport: "Cricket",
        startDate: new Date("2026-06-19T00:00:00Z"),
        endDate: new Date("2026-07-09T23:59:59Z"),
        location: "India",
        description: "The 9th ICC Champions Trophy, featuring the top eight ranked One Day International men's national teams competing in a high-stakes ODI tournament.",
        coverImage: "https://images.unsplash.com/photo-1531415080290-bc98545ab3ef?auto=format&fit=crop&w=1200&q=80",
        tags: ["Champions Trophy", "Cricket", "ODI"]
    },
    {
        title: "VCT Champions 2026",
        sport: "Valorant",
        startDate: new Date("2026-08-12T00:00:00Z"),
        endDate: new Date("2026-08-30T23:59:59Z"),
        location: "Tokyo, Japan",
        description: "The absolute pinnacle of the Valorant Champions Tour. The top 16 teams in the world battle to crown the 2026 world champion.",
        coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        tags: ["VCT", "Champions", "Esports", "Valorant"]
    },
    {
        title: "PGL CS2 Major Austin 2026",
        sport: "CS2",
        startDate: new Date("2026-11-01T00:00:00Z"),
        endDate: new Date("2026-11-14T23:59:59Z"),
        location: "Austin, Texas, USA",
        description: "The premier Counter-Strike 2 Major of 2026, taking place in Austin. The world's top 24 teams battle for glory and a massive $1.25M prize pool.",
        coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
        tags: ["Major", "CS2", "Esports", "PGL"]
    }
];

const seedDatabase = async () => {
    try {
        console.log("Connecting to database...");
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB database.");

        // Clear existing tournaments
        console.log("Clearing existing tournaments...");
        await Tournament.deleteMany({});
        console.log("Database cleared.");

        // Insert new tournaments
        console.log("Seeding new tournaments...");
        const seeded = await Tournament.insertMany(sampleTournaments);
        console.log(`Seeded ${seeded.length} tournaments successfully.`);

        // Close connection
        await mongoose.connection.close();
        console.log("Database connection closed.");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
