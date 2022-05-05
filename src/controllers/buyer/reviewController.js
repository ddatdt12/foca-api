const { User, Review, sequelize, Order } = require('../../db/models');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');

//@desc        	Create review
//@route        POST /api/buyer/reviews
//@access       PUBLIC
const createReviewForOrder = catchAsync(async (req, res, next) => {
	const { reviews } = req.body;
	const { orderId } = req.params;

	const order = await Order.findByPk(orderId);

	if (!order || order.buyerId !== req.user.id) {
		return next(
			new AppError('You are not allowed to review this order', 403)
		);
	}

	if (order.status !== 'COMPLETED') {
		return next(new AppError('You can only review a completed order', 403));
	}

	if (order.isReviewed) {
		return next(new AppError('You have already reviewed this order', 403));
	}

	const orderDetailIds = (await order.getOrderDetails()).map((o) => o.id);
	let allFounded = reviews.every((re) =>
		orderDetailIds.includes(re.orderDetailId)
	);
	if (!(orderDetailIds.length === reviews.length && allFounded)) {
		return next(
			new AppError('You are not allowed to review this order', 403)
		);
	}

	const data = await sequelize.transaction(async (t) => {
		reviews.forEach((re) => {
			re.userId = req.user.id;
		});
		const addedReviews = await Review.bulkCreate(reviews, {
			validate: true,
			transaction: t,
		});

		order.isReviewed = true;
		await order.save({ transaction: t });

		return addedReviews;
	});

	res.status(200).json({
		message: 'Review successfully',
		data,
	});
});

module.exports = {
	createReviewForOrder,
};
