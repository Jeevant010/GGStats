const express = require('express');
const router = express.Router();

const { tournamentController } = require('../controllers');

router.get('/', tournamentController.getTournaments);

module.exports = router;