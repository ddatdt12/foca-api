const { Product, OrderDetail } = require('../db/models');
const catchAsync = require('../utils/catchAsync');
const { cleanupQuery } = require('../validator/query');
const { Sequelize } = require('../db/models');
const { Op } = Sequelize;
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

//@desc         FOR TESTING: Login = uid
//@route        GET /api/products/:productId
//@access       PUBLIC
const getProductDetail = catchAsync(async (req, res, next) => {
	const product = await Product.findByPk(req.params.productId);

	const reviews = (
		await OrderDetail.findAll({
			where: {
				productId: req.params.productId,
				'$review.id$': {
					[Op.ne]: null,
				},
			},
			include: [
				{
					association: 'review',
					include: 'user',
				},
			],
		})
	).map((o) => o.review);

	res.status(200).json({
		message: 'Get products successfully',
		data: { ...product.get(), reviews },
	});
});

module.exports = {
	getAllProducts,
	getProductDetail,
};
