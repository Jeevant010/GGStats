const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const corsOptions = require('./config/cors');
const { configurePassport } = require('./config');
const routes = require('./routes');
const { errorHandler } = require('./middlewares');

const app = express();

///  ==================MIDDLEWARES==================

app.use(express.json());
app.use(express.urlencoded( { extended:true } ));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use(helmet());

// Rate Limiting , only for admin/ routes


/// =============== Passport jwt setup ==================

configurePassport();
app.use(passport.initialize());

///  ======================= ROUTES =====================

app.use(routes);

// Centralized error handler
app.use(errorHandler);

module.exports = app;
