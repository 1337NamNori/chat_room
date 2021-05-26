const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController.js');

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);

module.exports = router;
