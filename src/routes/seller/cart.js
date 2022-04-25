const express = require('express');

const router = express.Router();
const cartController = require('../../controllers/cartController');

router
	.route('/')
	.get(cartController.getCart)
	.post(cartController.createCartItem);
router
	.route('/:id')
	.put(cartController.updateCartItem)
	.delete(cartController.deleteCartItem);

module.exports = router;
