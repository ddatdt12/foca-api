const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const { updateUserSchema } = require('../validator/user');
const { protect } = require('../middlewares/auth');
const cartRoute = require('./seller/cart');

module.exports = (app) => {
	router.use(protect);
	router.put('/', updateUserSchema, authController.updateMe);
	router.use('/cart-items', cartRoute);
	app.use('/api/me', router);
};
