const { Product } = require('../db/models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
//@desc         FOR TESTING: Login = uid
//@route        POST /api/auth/login
//@access       PUBLIC
const getAllProducts = catchAsync(async (req, res) => {
	// const prods = await Product.findAll();
	res.status(200).json({
		message: 'Get all posts successfully',
		data: [
			{
				name: 'Mic check',
				price: 0,
				image: 'Mic check',
				description: 'Mic check',
				type: 'Mic check',
			},
			{
				name: 'Mic check 1',
				price: 110,
				image: 'Mic check1',
				description: 'Mic check 1',
				type: 'Mic check 1',
			},
		],
	});
});

module.exports = { getAllProducts };
