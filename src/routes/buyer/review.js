const express = require('express');

const router = express.Router({
	mergeParams: true,
});
const reviewController = require('../../controllers/buyer/reviewController');
const { createReviewsForOrderValidator } = require('../../validator/order');

router
	.route('/')
	.post(
		createReviewsForOrderValidator,
		reviewController.createReviewForOrder
	);

module.exports = router;
