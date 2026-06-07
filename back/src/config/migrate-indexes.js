const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

const mongoose = require('mongoose');
const { mongoUri } = require('./env');

const migrateIndexes = async () => {
    try {
        console.log("Connecting to database for index migration...");
        await mongoose.connect(mongoUri);
        console.log("Connected!");

        const db = mongoose.connection.db;

        try {
            await db.collection('users').dropIndex('phone_1');
            console.log(" Dropped existing index 'phone_1' ");
        } catch (err) {
            console.log("ℹNo existing 'phone_1' to drop. ");
        }

        try {
            await db.collection('users').createIndex(
                { phone: 1 },
                { unique: true, partialFilterExpression: { phone: { $type: "string" } } }
            );
            console.log(" Partial unique index created on 'phone' ");
        } catch (indexErr) {
            console.error("Failed to create partial unique index on phone:", indexErr);
            throw indexErr;
        }

        console.log("Index migration completed successfully.");
        process.exit(0);
    } catch (err) {
        console.error("Failed to migrate database indexes:", err);
        process.exit(1);
    }
};

migrateIndexes();
