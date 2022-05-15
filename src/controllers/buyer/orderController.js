const {
	sequelize,
	Order,
	OrderDetail,
	Product,
	CartItem,
	Notification,
	User,
} = require('../../db/models');
const AppError = require('../../utils/AppError');
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
	const { notes } = req.body;
	const cartItems = await CartItem.findAll({
		where: {
			userId: req.user.id,
		},
		include: ['product'],
	});

	const orderDetailsFromCart = cartItems.map((cartItem) => ({
		productId: cartItem.productId,
		price: cartItem.product.price,
		quantity: cartItem.quantity,
	}));
	if (cartItems.length === 0) {
		return next(new AppError('Your cart is empty', 400));
	}

	const totalPrice = orderDetailsFromCart.reduce(
		(acc, cur) => acc + cur.price * cur.quantity,
		0
	);
	const result = await sequelize.transaction(async (t) => {
		const order = await Order.create(
			{
				notes,
				totalPrice,
				buyerId: req.user.id,
			},
			{ transaction: t }
		);

		const orderDetails = await OrderDetail.bulkCreate(
			orderDetailsFromCart.map((p) => ({
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
		const admin = await User.findOne({
			where: {
				role: 'ADMIN',
			},
		});
		const noti = await Notification.create(
			{
				message: `Great! You have a new order! Order: #${order.id}!`,
				iconType: 'SUCCESS',
				userId: admin.id,
				orderId: order.id,
			},
			{
				transaction: t,
			}
		);

		await CartItem.destroy({
			where: {
				userId: req.user.id,
			},
			transaction: t,
		});

		order.setDataValue('orderDetails', orderDetails);
		return { order, notification: noti };
	});
	global.io
		?.to(result.notification.userId)
		.emit('received_notification', result.notification);

	res.status(200).json({
		message: 'Create post successfully',
		data: result.order,
	});
});

//@desc         Update order status
//@route        PUT /api/orders/:orderId
//@access       PRIVATE
const updateOrderStatus = catchAsync(async (req, res, next) => {
	const { status } = req.body;

	const admin = await User.findOne({
		where: {
			role: 'ADMIN',
		},
	});
	const order = await Order.update(
		{ status },
		{
			where: {
				id: req.params.orderId,
			},
		}
	);

	if (status === 'CANCELLED') {
		const noti = await Notification.create({
			message: `Customer has cancelled the order: #${req.params.orderId}`,
			iconType: 'CANCELLED',
			userId: admin.id,
		});

		global.io?.to(noti.userId)?.emit('received_notification', noti);
	}

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
