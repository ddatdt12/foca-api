const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');

module.exports = (app) => {
	router.get('/', productController.getAllProducts);
	app.use('/api/posts', router);
};
