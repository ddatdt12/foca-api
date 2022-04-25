const express = require('express');
const router = express.Router();
const userRoute = require('./user');

module.exports = (app) => {
	router.use('/users', userRoute);
	app.use('/api/seller', router);
};
