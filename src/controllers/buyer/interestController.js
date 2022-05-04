const { User, Product, InterestProduct } = require('../../db/models');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');

//@desc        Get interested Product
//@route        GET /api/me/interested-products
//@access       PUBLIC
const getInterestedProducts = catchAsync(async (req, res, next) => {
	const user = await User.findByPk(req.user.id);
	const prods = await user.getInterestedProducts();
	res.status(200).json({
		message: 'Get all interested products successfully',
		data: prods,
	});
});

//@desc         create interested products
//@route        POST /api/me/interested-products
//@access       PUBLIC
const addInterestedProduct = catchAsync(async (req, res, next) => {
	const { productId } = req.body;
	const prod = await Product.findByPk(productId);

	if (!prod) {
		return next(new AppError('Product not found', 404));
	}

	await InterestProduct.create({
		userId: req.user.id,
		productId: prod.id,
	});

	res.status(200).json({
		message: 'Add interested product successfully',
		data: null,
	});
});

//@desc         delete interested products
//@route        Delete /api/me/interested-products/:id
//@access       PUBLIC
const deteteInterestedProduct = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const interestedProd = await InterestProduct.findByPk(id);

	if (!interestedProd) {
		return next(new AppError('Product not found', 404));
	}

	await interestedProd.destroy();

	res.status(200).json({
		message: 'delete interested product successfully',
		data: null,
	});
});

module.exports = {
	getInterestedProducts,
	addInterestedProduct,
	deteteInterestedProduct,
};
