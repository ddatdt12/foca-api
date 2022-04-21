const express = require('express');
const {
	sendEmailVerification,
	checkVerificationCode,
} = require('../controllers/emailController');

const router = express.Router();

module.exports = (app) => {
	router.post('/account-verification', sendEmailVerification);
	router.post('/verify-code', checkVerificationCode);
	app.use('/api/email', router);
};
