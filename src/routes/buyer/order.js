const express = require('express');

const router = express.Router();
const reviewRoute = require('./review');
const orderController = require('../../controllers/buyer/orderController');
const { createOrderSchema } = require('../../validator/order');
const { filterGetOrdersQuery } = require('../../validator/query');

router.use('/:orderId/reviews', reviewRoute);

router.route('/recent').get(orderController.getRecentOrders);
router
	.route('/')
	.get(filterGetOrdersQuery, orderController.getOrders)
	.post(createOrderSchema, orderController.createOrder);
router
	.route('/:orderId')
	.get(orderController.getOrderDetail)
	.put(orderController.updateOrderStatus);

module.exports = router;
