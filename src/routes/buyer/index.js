const express = require('express');

const router = express.Router();

const orderRoute = require('./order');
const cartRoute = require('./cart');
const interestRoute = require('./interested_product');
const notificationRoute = require('./notification');
const { protect } = require('../../middlewares/auth');
module.exports = (app) => {
	router.use(protect);
	router.use('/orders', orderRoute);
	router.use('/cart-items', cartRoute);
	router.use('/notifications', notificationRoute);
	router.use('/interested-products', interestRoute);
	app.use('/api/buyer', router);
};
