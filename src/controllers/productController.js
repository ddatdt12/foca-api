const { Product } = require('../db/models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
//@desc         FOR TESTING: Login = uid
//@route        POST /api/auth/login
//@access       PUBLIC
const getAllProducts = catchAsync(async (req, res) => {
	const prods = await Product.findAll();
	res.status(200).json({
		message: 'Get all posts successfully',
		data: prods,
	});
});

module.exports = { getAllProducts };
