const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const app = require('./app');
const { connectDatabase } = require('./config');
const { port } = require('./config/env');


///=============================== DATABASE =============================

connectDatabase();

///  ======================= SERVER START =====================

app.listen( port , () => console.log("App is running on port http://localhost:" + port));
