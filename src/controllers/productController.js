const { Product, OrderDetail, sequelize } = require('../db/models');
const catchAsync = require('../utils/catchAsync');
const { cleanupQuery } = require('../validator/query');
const { Sequelize } = require('../db/models');
const { convertArrayToMap } = require('../utils');
const { Op } = Sequelize;
//@desc         FOR TESTING: Login = uid
//@route        POST /api/products
//@access       PUBLIC
const getAllProducts = catchAsync(async (req, res, next) => {
	const filterQuery = cleanupQuery(req.query);

	const prodsQuery = Product.findAll({
		...filterQuery,
	});

	const productsWithRatingQuery = OrderDetail.findAll({
		include: [
			{
				association: 'review',
				attributes: [],
			},
		],
		group: ['productId'],
		attributes: [
			'productId',
			[
				sequelize.fn('COUNT', sequelize.col('order_detail.id')),
				'orderCount',
			],
			[
				sequelize.fn('AVG', sequelize.col('review.rating')),
				'averageRating',
			],
			[sequelize.fn('COUNT', sequelize.col('review.id')), 'reviewCount'],
		],
		raw: true,
	});
	const [prods, productsWithRating] = await Promise.all([
		prodsQuery,
		productsWithRatingQuery,
	]);
	const productWithRatingMap = convertArrayToMap(
		productsWithRating,
		'productId'
	);
	prods.forEach((prod) => {
		prod.setDataValue(
			'orderCount',
			productWithRatingMap.get(prod.id)?.orderCount || 0
		);
		prod.setDataValue(
			'averageRating',
			productWithRatingMap.get(prod.id)?.averageRating || 0
		);
		prod.setDataValue(
			'reviewCount',
			productWithRatingMap.get(prod.id)?.reviewCount || 0
		);
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
