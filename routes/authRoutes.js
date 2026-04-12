const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Views
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

// Actions
router.post('/register', authController.register);
router.post('/login', authController.login);

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = router;