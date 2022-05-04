const express = require('express');
const router = express.Router();
const userRoute = require('./user');
const productRoute = require('./product');

module.exports = (app) => {
	router.use('/users', userRoute);
	router.use('/products', productRoute);
	app.use('/api/admin', router);
};
