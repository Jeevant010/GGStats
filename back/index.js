const express = require('express');
const app = express();
const port = 9000;

require('dotenv').config();
// =========================== IMPORT OF REQUIRED MODULES =================================

const helmet = require("helmet");
const bcrypt = require("bcrypt");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");



// +======================== IMPORT OF MODELS ==========================
const User = require('./models/User');


// ========================== IMPORT OF ROUTES =========================
const authRoutes = require('./routes/auth');



///=============================== DATABASE =============================


mongoose.connect(
        `mongodb+srv://Main:${process.env.MONGO}@mongocluster.gmqer.mongodb.net/?retryWrites=true&w=majority&appName=mongoCluster`

    ).then(async () => {
        console.log("Connected!");

        const db = mongoose.connection.db;
        try {
            await db.collection('users').dropIndex('phone_1');
            console.log(" Dropped existing index 'phone_1' ");
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

app.use(express.json());
app.use(express.urlencoded( { extended:true } ));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));



app.use(helmet());

// Rate Limiting , only for admin/ routes




/// =============== Passport jwt setup ==================

const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJWt = require('passport-jwt').ExtractJwt;

    const opts = {
        jwtFromRequest: ExtractJWt.fromAuthHeaderAsBearerToken(),
        secretOrKey : process.env.TOKEN,
    };

    passport.use('user-jwt' , new JwtStrategy(opts , async (jwt_payload , done) => {
        try {
            const user  = await User.findById(jwt_payload.id);
            if(user) return done(null, user);
            return done(null , false);
        }   catch (err) {
            return done(err, false);
        }
    }));
app.use(passport.initialize());
///  ======================= ROUTES =====================

app.get( "/" , (req, res) => res.send( " Can you see me?" ) );
app.use(authRoutes);
app.listen( port , () => console.log("App is running on port http://localhost:" + port));

