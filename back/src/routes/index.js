const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const esportsRoutes = require('./esports.routes');

router.get( "/" , (req, res) => res.send( " Can you see me?" ) );
router.use(authRoutes);
router.use('/api/esports', esportsRoutes);

module.exports = router;
