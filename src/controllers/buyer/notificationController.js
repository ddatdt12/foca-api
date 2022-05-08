const {
	User,
	Review,
	sequelize,
	Order,
	Notification,
} = require('../../db/models');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');

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
};
