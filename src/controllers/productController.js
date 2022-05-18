const { Product, OrderDetail, sequelize } = require('../db/models');
const catchAsync = require('../utils/catchAsync');
const { cleanupQuery } = require('../validator/query');
const { Op } = require('sequelize');
const { convertArrayToMap } = require('../utils');
//@desc         get all products
//@route        GET /api/products
//@access       PUBLIC
const getAllProducts = catchAsync(async (req, res) => {
	const filterQuery = cleanupQuery(req.query);

	const prodsQuery = Product.findAll({
		...filterQuery,
		attributes: {
			include: [
				[
					sequelize.literal(`(
						SELECT CAST (coalesce(AVG(rating),0) AS DOUBLE PRECISION)
						FROM order_detail AS "orderD"
						FULL JOIN review ON review."orderDetailId" = "orderD".id
						WHERE "orderD"."productId" = product.id
							)`),
					'averageRating',
				],
			],
		},
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
			'reviewCount',
			productWithRatingMap.get(prod.id)?.reviewCount || 0
		);
	});

	res.status(200).json({
		message: 'Get products successfully',
		data: prods,
	});
});

//@desc         get product detail
//@route        GET /api/products/:productId
//@access       PUBLIC
const getProductDetail = catchAsync(async (req, res) => {
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
			limit: 5,
		})
	).map((o) => o.review);

	const prodStats = await OrderDetail.findAll({
		where: {
			productId: req.params.productId,
		},
		include: [
			{
				association: 'review',
				attributes: [],
			},
		],
		attributes: [
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
	res.status(200).json({
		message: 'Get product detail successfully',
		data: { ...product.get(), reviews, ...prodStats[0] },
	});
});

module.exports = {
	getAllProducts,
	getProductDetail,
};
