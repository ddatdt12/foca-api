const { Order, Notification } = require('../../db/models');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');
const { cleanupQuery } = require('../../validator/query');

//@desc         get orders
//@route        POST GET /api/orders
//@access       PUBLIC
const getOrders = catchAsync(async (req, res) => {
	const findOptions = cleanupQuery(req.query);
	const orders = await Order.findAll({
		...findOptions,
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
			{
				association: 'buyer',
				attributes: [
					'id',
					'firstName',
					'username',
					'lastName',
					'fullName',
					'photoUrl',
					'email',
					'phoneNumber',
				],
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
		message: 'Get post detail successfully',
		data: order,
	});
});

//@desc         Update order status
//@route        POST /api/orders/:orderId
//@access       PUBLIC
const updateOrderStatus = catchAsync(async (req, res, next) => {
	const { status, surcharge } = req.body;
	if (status === 'PENDING' && !surcharge) {
		return next(new AppError('Pending order must have surcharge', 400));
	}

	const order = await Order.findByPk(req.params.id);

	if (!order) {
		return next(new AppError('Order not found', 404));
	}
	order.status = status;
	if (surcharge) {
		order.totalPrice = order.totalPrice - order.surcharge + surcharge;
		order.surcharge = surcharge;
	}
	const notiData = {
		userId: order.buyerId,
	};

	const yourOrderString = `Your order #${order.id}`;
	switch (status) {
		case 'PENDING':
			notiData.message =
				yourOrderString +
				'needs to be confirmed because of the extra cost';
			notiData.iconType = 'MONEY';
			break;
		case 'PROCESSING':
			notiData.message =
				yourOrderString +
				'is in progress and will be delivered in a few minutes';
			notiData.iconType = 'SUCCESS';
			break;
		case 'COMPLETED':
			notiData.message = yourOrderString + 'is successful!';
			notiData.iconType = 'SUCCESS';
			break;
		case 'CANCELLED':
			notiData.message = yourOrderString + ` has been cancelled`;
			notiData.iconType = 'ERROR';
			break;
		default:
			break;
	}
	const [, noti] = await Promise.all([
		order.save(),
		Notification.create(notiData),
	]);
	global.io.to(noti.userId).emit('received_notification', noti);

	res.status(200).json({
		message: 'Update order successfully',
		data: order,
	});
});

module.exports = { getOrders, getOrderDetail, updateOrderStatus };
