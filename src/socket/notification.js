const { Notification } = require('../db/models');
const { validateNotiData } = require('../validator/notification');
const createNotification = async (noti) => {
	const value = validateNotiData(noti);
	return await Notification.create(value);
};
const seenNotifications = async (userId) => {
	await Notification.update(
		{
			isSeen: true,
		},
		{
			where: {
				userId,
				isSeen: false,
			},
		}
	);
};

module.exports = {
	createNotification,
	seenNotifications,
};
