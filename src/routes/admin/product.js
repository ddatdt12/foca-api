const express = require('express');

const router = express.Router();
const productController = require('../../controllers/admin/productController');
const { filterGetProductsQuery } = require('../../validator/query');

router
	.route('/')
	.get(filterGetProductsQuery, productController.getAllProducts)
	.post(productController.createProduct);
router.post('/batch-restore', productController.restoreProduct);

router
	.route('/:id')
	.put(productController.updateProduct)
	.delete(productController.deteteProduct);

module.exports = router;
