const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');
const reviewController = require('../controllers/buyer/reviewController');
const { filterGetProductsQuery } = require('../validator/query');

module.exports = (app) => {
	router
		.route('/')
		.get(filterGetProductsQuery, productController.getAllProducts);
	router.route('/:productId').get(productController.getProductDetail);
	router.route('/:productId/reviews').get(reviewController.getProductReviews);
	router
		.route('/:productId/reviews/stats')
		.get(reviewController.getProductReviewStats);
	router
		.route('/top-5-')
		.get(filterGetProductsQuery, productController.getAllProducts);
	app.use('/api/products', router);
};
