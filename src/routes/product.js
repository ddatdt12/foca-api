const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const { createUserSchema } = require('../validator/user');

module.exports = (app) => {
	router.get('/', authController.login);
	app.use('/api/products', router);
};
