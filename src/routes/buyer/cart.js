const express = require('express');

const router = express.Router();
const cartController = require('../../controllers/buyer/cartController');

router
	.route('/')
	.get(cartController.getCarts)
	.post(cartController.createCartItem);
router
	.route('/:id')
	.put(cartController.updateCartItem)
	.delete(cartController.deleteCartItem);

module.exports = router;
