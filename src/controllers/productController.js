const { Product, Sequelize } = require('../db/models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const cleanupQuery = (query) => {
	//Copy req.query
	const reqQuery = { ...query };
	console.log('reqQuery', reqQuery);
	let filterQuery = {};
	//Fields to exclude
	const removeFields = ['select', 'sort', 'page', 'limit', 'q'];

	//Loop over removeFields and delete them from reqStr
	removeFields.forEach((param) => delete reqQuery[param]);

	if (query.q) {
		reqQuery.name = {
			[Sequelize.Op.iLike]: '%' + query.q + '%',
		};
	}

	if (query.limit) {
		filterQuery.limit = parseInt(query.limit);
		console.log('query.limit check', filterQuery);
	}
	filterQuery = {
		where: {
			...reqQuery,
		},
		...filterQuery,
	};
	return filterQuery;
};

//@desc         FOR TESTING: Login = uid
//@route        POST /api/products
//@access       PUBLIC
const getAllProducts = catchAsync(async (req, res, next) => {
	const filterQuery = cleanupQuery(req.query);

	console.log('filterQuery', filterQuery);
	const prods = await Product.findAll({
		...filterQuery,
	});
	res.status(200).json({
		message: 'Get products successfully',
		data: prods,
	});
});

module.exports = {
	getAllProducts,
};
