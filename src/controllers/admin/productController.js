const { Product, OrderDetail } = require('../../db/models');
const catchAsync = require('../../utils/catchAsync');
const { cleanupQuery } = require('../../validator/query');

//@desc         FOR TESTING: Login = uid
//@route        POST /api/products
//@access       PUBLIC
const getAllProducts = catchAsync(async (req, res, next) => {
	const filterQuery = cleanupQuery(req.query);

	const prods = await Product.findAll({
		...filterQuery,
	});

	res.status(200).json({
		message: 'Get products successfully',
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
		message: 'Create product successfully',
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
		message: 'update product successfully',
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
