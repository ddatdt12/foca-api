const express = require('express');

const router = express.Router();
const productController = require('../../controllers/admin/productController');
const { filterQuery } = require('../../validator/query');

router
	.route('/')
	.get(filterQuery, productController.getAllProducts)
	.post(productController.createProduct);

// router
// 	.route('/:id')
// 	.put(productController.getProduct)
// 	.delete(productController.deleteProduct);

module.exports = router;
