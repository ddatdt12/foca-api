const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const { createUserSchema } = require('../validator/user');

module.exports = (app) => {
	router.post('/login', authController.login);
	router.post('/register', createUserSchema, authController.register);
	app.use('/api/auth', router);
};
