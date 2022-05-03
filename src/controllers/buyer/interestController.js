const { User, Product } = require('../../db/models');
const AppError = require('../../utils/AppError');
const catchAsync = require('../utils/catchAsync');

//@desc        Get interested Product
//@route        GET /api/me/interested-products
//@access       PUBLIC
const getInterestedProducts = catchAsync(async (req, res, next) => {
	const order = await User.findByPk(req.user.id);
	if (!order) {
		return next(new AppError('User not found', 404));
	}
	const interestedProds = order.getInterestedProducts();
	res.status(200).json({
		message: 'Get all orders successfully',
		data: interestedProds,
	});
});

//@desc         create interested products
//@route        POST /api/me/interested-products
//@access       PUBLIC
const addInterestedProduct = catchAsync(async (req, res, next) => {
	const { productId } = req.body;
	const user = await User.findByPk(req.user.id);
	const prod = await Product.findByPk(productId);

	if (!prod) {
		return next(new AppError('Product not found', 404));
	}

	await user.addInterestProduct(prod);

	res.status(200).json({
		message: 'Add interested product successfully',
		data: null,
	});
});
//@desc         delete interested products
//@route        POST /api/me/interested-products
//@access       PUBLIC
const deteteInterestedProduct = catchAsync(async (req, res, next) => {
	const { productId } = req.body;
	const user = await User.findByPk(req.user.id);
	const prod = await Product.findByPk(productId);

	if (!prod) {
		return next(new AppError('Product not found', 404));
	}

	await user.addInterestProduct(prod);

	res.status(200).json({
		message: 'Add interested product successfully',
		data: null,
	});
});

module.exports = { getInterestedProducts };
