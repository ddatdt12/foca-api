const { Product, CartItem } = require('../../db/models');
const catchAsync = require('../../utils/catchAsync');
const { cleanupQuery } = require('../../validator/query');

//@desc         FOR TESTING: Login = uid
//@route        POST /api/products
//@access       PUBLIC
const getAllProducts = catchAsync(async (req, res) => {
	const filteredOptions = cleanupQuery(req.query);

	const prods = await Product.findAll({
		...filteredOptions,
	});

	res.status(200).json({
		message: 'Get products successfully',
		data: prods,
	});
});

//@desc         Create new product
//@route        POST /api/products
//@access       PUBLIC
const createProduct = catchAsync(async (req, res) => {
	const prod = await Product.create({
		...req.body,
	});
	res.status(200).json({
		message: 'Create product successfully',
		data: prod,
	});
});

//@desc         update product
//@route        POST /api/admin/products/:id
//@access       PUBLIC
const updateProduct = catchAsync(async (req, res) => {
	const prod = await Product.update(
		{
			...req.body,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	);
	res.status(200).json({
		message: 'update product successfully',
		data: prod,
	});
});

//@desc         delete product
//@route        DELETE /api/admin/products/:id
//@access       PUBLIC
const deteteProduct = catchAsync(async (req, res) => {
	const prodDestroyQuery = Product.destroy({
		where: {
			id: req.params.id,
		},
	});

	const cartDeteleQuery = CartItem.destroy({
		where: {
			productId: req.params.id,
		},
	});

	const [prodDeleteInfo] = await Promise.all([
		prodDestroyQuery,
		cartDeteleQuery,
	]);

	res.status(200).json({
		message: 'delete product successfully',
		data: prodDeleteInfo,
	});
});

//@desc         restore product
//@route        POST /api/admin/products/batch-restore
//@access       PUBLIC
const restoreProduct = catchAsync(async (req, res) => {
	const prods = await Product.restore({
		where: {
			id: req.body.productIds,
		},
	});

	res.status(200).json({
		message: 'restore products successfully',
		data: prods,
	});
});

module.exports = {
	getAllProducts,
	createProduct,
	updateProduct,
	deteteProduct,
	restoreProduct,
};
