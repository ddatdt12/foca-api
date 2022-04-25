const express = require('express');

const router = express.Router();

const orderRoute = require('./order');
module.exports = (app) => {
	router.use('/orders', orderRoute);
	app.use('/api/buyer', router);
};
