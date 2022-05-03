const express = require('express');

const router = express.Router();

const orderRoute = require('./order');
const cartRoute = require('./cart');
module.exports = (app) => {
	router.use('/orders', orderRoute);
	router.use('/cart-items', cartRoute);
	app.use('/api/buyer', router);
};
