const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');
const { filterQuery } = require('../validator/query');

module.exports = (app) => {
	router.route('/').get(filterQuery, productController.getAllProducts);
	router.route('/top-5-').get(filterQuery, productController.getAllProducts);
	app.use('/api/products', router);
};
