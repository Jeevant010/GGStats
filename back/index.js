const express = require('express');
const app = express();
const port = 8000;
const bcrypt = require("bcrypt");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const newsRoutes = require('./routes/news');
require('dotenv').config();
const authRoutes = require('./routes/auth');


app.use('/api', newsRoutes);
mongoose.connect(
        `mongodb+srv://Main:${process.env.MONGO}@mongocluster.gmqer.mongodb.net/?retryWrites=true&w=majority&appName=mongoCluster`

    ).then(async () => {
        console.log("Connected!");

        const db = mongoose.connection.db;
        try {
            await db.collection('users').dropIndex('phone_1');
            console.log(" Dropped existing index 'email_1' ");
        } catch(err){
            console.log("ℹNo existing 'phone_1' to drop. " );
        }
            await db.collection('users').createIndex(
                { phone: 1 },
                { unique : true , partialFilterExpression: { phone : { $type : "string" } } }
            );
            console.log(" Partial unique index created on 'phone' ");
    }).catch( err => console.log("Error , Not connected!" , err));


    ///  ==================MIDDLEWARES==================










///  ======================= ROUTES =====================
app.use(authRoutes);
app.get( "/" , (req, res) => res.send( " Can you see me?" ) );
app.listen( port , () => console.log("App is running on port http://localhost:" + port));

