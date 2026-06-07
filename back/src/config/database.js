const mongoose = require('mongoose');
const { mongoUri } = require('./env');

const connectDatabase = () => {
    return mongoose.connect(
        mongoUri,
        {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        }
    ).then(() => {
        console.log("Connected!");
    }).catch((err) => {
        console.error("Error , Not connected!", err);
        process.exit(1);
    });
};

module.exports = connectDatabase;
