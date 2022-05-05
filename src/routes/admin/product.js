const express = require('express');

const router = express.Router();
const productController = require('../../controllers/admin/productController');
const { filterGetProductsQuery } = require('../../validator/query');

router
	.route('/')
	.get(filterGetProductsQuery, productController.getAllProducts)
	.post(productController.createProduct);

// router
// 	.route('/:id')
// 	.put(productController.getProduct)
// 	.delete(productController.deleteProduct);

module.exports = router;
