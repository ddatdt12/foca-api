const {
	sequelize,
	Order,
	OrderDetail,
	Product,
	CartItem,
} = require('../../db/models');
const catchAsync = require('../../utils/catchAsync');

//@desc         get orders
//@route        POST GET /api/orders
//@access       PUBLIC
const getOrders = catchAsync(async (req, res) => {
	const orders = await Order.findAll({
		where: {
			buyerId: req.user.id,
		},
		include: [
			{
				association: 'orderDetails',
				include: [
					{
						association: 'product',
						paranoid: false,
					},
				],
			},
		],
	});
	res.status(200).json({
		message: 'Get all orders successfully',
		data: orders,
	});
});

//@desc         get orders
//@route        POST GET /api/orders
//@access       PUBLIC
const getRecentOrders = catchAsync(async (req, res) => {
	const orders = await Order.findAll({
		where: {
			buyerId: req.user.id,
		},
		order: [['createdAt', 'DESC']],
		limit: 5,
		include: [
			{
				association: 'orderDetails',
				include: ['product'],
			},
		],
	});
	res.status(200).json({
		message: 'Get all orders successfully',
		data: orders,
	});
});

//@desc         get order detail
//@route        GET /api/orders/:id
//@access       PUBLIC
const getOrderDetail = catchAsync(async (req, res) => {
	const order = await Order.findByPk(req.params.orderId, {
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
		data: order,
	});
});

//@desc         Create order
//@route        POST /api/orders
//@access       PUBLIC
const createOrder = catchAsync(async (req, res, next) => {
	const cartItems = await CartItem.findAll({
		where: {
			userId: req.user.id,
		},
	});
	const totalPrice = req.body.orderDetails.reduce(
		(acc, cur) => acc + cur.price * cur.quantity,
		0
	);
	const result = await sequelize.transaction(async (t) => {
		const order = await Order.create(
			{
				...req.body,
				totalPrice,
				buyerId: req.user.id,
			},
			{ transaction: t }
		);

		const orderDetails = await OrderDetail.bulkCreate(
			req.body.orderDetails.map((p) => ({
				...p,
				orderId: order.id,
			})),
			{
				transaction: t,
				include: [
					{
						model: Product,
						as: 'product',
					},
				],
			}
		);

		let includedOrderDetails = await Promise.all(
			orderDetails.map(async (o) => {
				o.setDataValue('product', await o.getProduct());
				return o;
			})
		);

		order.setDataValue('orderDetails', includedOrderDetails);
		return order;
	});

	res.status(200).json({
		message: 'Create post successfully',
		data: result,
	});
});

//@desc         Update order status
//@route        POST /api/orders/:orderId
//@access       PUBLIC
const updateOrderStatus = catchAsync(async (req, res, next) => {
	const { status } = req.body;
	const order = await Order.update(
		{ status },
		{
			where: {
				id: req.params.orderId,
			},
		}
	);
	res.status(200).json({
		message: 'Create post successfully',
		data: order,
	});
});

module.exports = {
	getOrders,
	getRecentOrders,
	getOrderDetail,
	updateOrderStatus,
	createOrder,
};
