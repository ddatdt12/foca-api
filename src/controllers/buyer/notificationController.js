const { Notification } = require('../../db/models');
const catchAsync = require('../../utils/catchAsync');
const { validateNotiData } = require('../../validator/notification');

//@desc        	Create review
//@route        POST /api/buyer/notifications
//@access       PUBLIC
const getNotifications = catchAsync(async (req, res, next) => {
	const notis = await Notification.findAll({
		where: { userId: req.user.id, ...req.query },
	});
	res.status(200).json({
		message: 'get notifications successfully',
		data: notis,
	});
});

//@desc        	Create review
//@route        POST /api/buyer/notifications
//@access       PUBLIC
const createNotification = catchAsync(async (req, res, next) => {
	const value = validateNotiData(req.body);
	const noti = await Notification.create(value);
	res.status(200).json({
		message: 'get notifications successfully',
		data: noti,
	});
});

//@desc        	Create review
//@route        GET /api/buyer/notifications
//@access       PUBLIC
const markAllSeenNotification = catchAsync(async (req, res, next) => {
	const data = await Notification.update(
		{
			isSeen: true,
		},
		{
			where: { userId: req.user.id, isSeen: false },
		}
	);
	res.status(200).json({
		message: 'mark all notifications seen successfully',
		data,
	});
});

module.exports = {
	getNotifications,
	markAllSeenNotification,
	createNotification,
};
