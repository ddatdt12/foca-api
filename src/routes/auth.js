const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const { createUserSchema } = require('../validator/user');

module.exports = (app) => {
	router.get('/', protect, authController.authVerify);
	router.post('/login', authController.login);
	router.post('/register', createUserSchema, authController.register);
	app.use('/api/auth', router);
};
