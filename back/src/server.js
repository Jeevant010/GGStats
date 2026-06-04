const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const app = require('./app');
const { connectDatabase } = require('./config');
const { port } = require('./config/env');


///=============================== DATABASE =============================

///=============================== DATABASE =============================

(async () => {
    try {
        await connectDatabase();

        ///  ======================= SERVER START =====================

        app.listen(port, () => console.log("App is running on port http://localhost:" + port));
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
})();

///  ======================= SERVER START =====================

app.listen(port, () => console.log("App is running on port http://localhost:" + port));
