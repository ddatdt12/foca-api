const express = require('express');

const router = express.Router();
const orderController = require('../../controllers/orderController');
const { protect } = require('../../middlewares/auth');
const { createOrderSchema } = require('../../validator/order');

router.use(protect);
router.route('/').get(orderController.getOrders);

module.exports = router;
