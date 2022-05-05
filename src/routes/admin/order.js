const express = require('express');

const router = express.Router();
const orderController = require('../../controllers/admin/orderController');
const { filterGetOrdersQuery } = require('../../validator/query');

router.route('/').get(filterGetOrdersQuery, orderController.getOrders);

module.exports = router;
