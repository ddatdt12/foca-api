const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');
const { filterQuery } = require('../validator/query');

module.exports = (app) => {
	router.get('/', filterQuery, productController.getAllProducts);
	app.use('/api/posts', router);
};
