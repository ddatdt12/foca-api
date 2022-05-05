const express = require('express');
const router = express.Router();
const userRoute = require('./user');
const productRoute = require('./product');
const orderRoute = require('./order');

module.exports = (app) => {
	router.use('/users', userRoute);
	router.use('/orders', orderRoute);
	router.use('/products', productRoute);
	app.use('/api/admin', router);
};
