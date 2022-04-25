const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');

module.exports = (app) => {
	router
		.route('/')
		.get(productController.getAllProducts)
		.post(productController.createProduct);
	app.use('/api/products', router);
};
