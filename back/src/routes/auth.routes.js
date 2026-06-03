const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', verifyToken, authController.getMe);
router.get('/get/user/:userId', verifyToken, authController.getUserById);
router.post('/changePassword', verifyToken, authController.changePassword);
router.post('/', authController.handlePost);

module.exports = router;
