const express = require('express');

const router = express.Router({
	mergeParams: true,
});
const reviewController = require('../../controllers/buyer/reviewController');
const { createReviewsForOrderValidator } = require('../../validator/order');

router
	.route('/')
	.get((req, res) => {
		console.log('req.params: ', req.params);
		res.json({
			message: 'Get all reviews successfully ' + req.params.id,
		});
	})
	.post(
		createReviewsForOrderValidator,
		reviewController.createReviewForOrder
	);

module.exports = router;
