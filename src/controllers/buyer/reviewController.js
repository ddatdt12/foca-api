const { Review, sequelize, Order } = require('../../db/models');
const { convertArrayToMap } = require('../../utils');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');

const getProductReviews = catchAsync(async (req, res) => {
	const reviews = await Review.findAll({
		where: {
			'$orderDetail.productId$': req.params.productId,
		},
		include: [
			{
				association: 'orderDetail',
				attributes: [],
			},
			{
				association: 'user',
			},
		],
	});
	res.status(200).json({
		message: 'Get all reviews successfully',
		data: reviews,
	});
});

const getProductReviewStats = catchAsync(async (req, res) => {
	const classifiedReview = await Review.findAll({
		where: {
			'$orderDetail.productId$': req.params.productId,
		},
		include: [
			{
				association: 'orderDetail',
				attributes: [],
			},
		],
		attributes: [
			'rating',
			[sequelize.fn('count', sequelize.col('review.id')), 'quantity'],
		],
		group: ['rating'],
		raw: true,
	});

	const ratingMap = convertArrayToMap(classifiedReview, 'rating');
	const result = Array(5).map((_, index) => {
		return ratingMap.get(index + 1) || { rating: index + 1, quantity: 0 };
	});
	res.status(200).json({
		message: 'Get reviews stats successfully',
		data: result,
	});
});

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
	getProductReviewStats,
	getProductReviews,
};
