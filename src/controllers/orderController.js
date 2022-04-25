const { sequelize, Order, OrderDetail } = require('../db/models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
//@desc         FOR TESTING: Login = uid
//@route        POST /api/auth/login
//@access       PUBLIC
const getOrders = catchAsync(async (req, res) => {
	const prods = await Order.findAll({
		where: {
			buyerId: req.user.id,
		},
		include: [
			{
				association: 'orderDetails',
				include: ['product'],
			},
		],
	});
	res.status(200).json({
		message: 'Get all orders successfully',
		data: prods,
	});
});
//@desc         FOR TESTING: Login = uid
//@route        POST /api/auth/login
//@access       PUBLIC
const getOrderDetail = catchAsync(async (req, res) => {
	const prods = await Order.findByPk(req.params.id, {
		include: [
			'buyer',
			{
				association: 'orderDetails',
				include: ['product'],
			},
		],
	});
	res.status(200).json({
		message: 'Get post detail successfully',
		data: prods,
	});
});
//@desc         Create new product
//@route        POST /api/products
//@access       PUBLIC
const createOrder = catchAsync(async (req, res, next) => {
	const result = await sequelize.transaction(async (t) => {
		const order = await Order.create(
			{
				...req.body,
				buyerId: req.user.id,
			},
			{ transaction: t }
		);

		const orderDetails = await OrderDetail.bulkCreate(
			req.body.orderDetails.map((p) => ({
				...p,
				orderId: 6,
			})),
			{ transaction: t }
		);
		order.orderDetails = orderDetails;
		return order;
	});

	res.status(200).json({
		message: 'Create post successfully',
		data: result,
	});
});
//@desc         Create new product
//@route        POST /api/products
//@access       PUBLIC
const updateOrderStatus = catchAsync(async (req, res, next) => {
	const { status } = req.body;
	const order = await Order.update(
		{ status },
		{
			where: {
				id: req.params.id,
			},
		}
	);
	res.status(200).json({
		message: 'Create post successfully',
		data: order,
	});
});

module.exports = { getOrders, getOrderDetail, updateOrderStatus, createOrder };
