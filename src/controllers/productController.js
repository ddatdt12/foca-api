const { Product } = require('../db/models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
//@desc         FOR TESTING: Login = uid
//@route        POST /api/products
//@access       PUBLIC
const getAllProducts = catchAsync(async (req, res, next) => {
	// return next(new AppError('This is a test error', 400));
	const prods = await Product.findAll();
	res.status(200).json({
		message: 'Get all posts successfully',
		data: prods,
	});
});
//@desc         Create new product
//@route        POST /api/products
//@access       PUBLIC
const createProduct = catchAsync(async (req, res, next) => {
	const prod = await Product.create({
		...req.body,
	});
	res.status(200).json({
		message: 'Create post successfully',
		data: prod,
	});
});
//@desc         update product
//@route        POST /api/products
//@access       PUBLIC
const updateProduct = catchAsync(async (req, res, next) => {
	const prod = await Product.create({
		...req.body,
	});
	res.status(200).json({
		message: 'update post successfully',
		data: prod,
	});
});
//@desc         Create new product
//@route        POST /api/products
//@access       PUBLIC
const deteteProduct = catchAsync(async (req, res) => {
	const prod = await Product.destroy({
		where: {
			id: req.params.id,
		},
	});
	res.status(200).json({
		message: 'delete product successfully',
		data: prod,
	});
});

module.exports = {
	getAllProducts,
	createProduct,
	updateProduct,
	deteteProduct,
};
