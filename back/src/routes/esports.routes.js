const express = require('express');
const router = express.Router();
const esportsController = require('../controllers/esports.controller');

router.get('/cs2', esportsController.getMatches);

module.exports = router;
