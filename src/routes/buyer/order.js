const express = require('express');

const router = express.Router();
const orderController = require('../../controllers/orderController');
const { protect } = require('../../middlewares/auth');
const { createOrderSchema } = require('../../validator/order');

router
	.route('/')
	.get(orderController.getOrders)
	.post(createOrderSchema, orderController.createOrder);
router
	.route('/:id')
	.get(orderController.getOrderDetail)
	.put(orderController.updateOrderStatus);

module.exports = router;
