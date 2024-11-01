const express = require('express');
const { handleGoogleLogin, googleAuthRedirect } = require('../controllers/socialAuthController');
const router = express.Router();

router.post('/social-login', handleGoogleLogin);

router.get('/social-login', googleAuthRedirect);

module.exports = router;
