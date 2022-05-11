const express = require('express');

const router = express.Router();
const notificationController = require('../controllers/buyer/notificationController');
const { protect } = require('../middlewares/auth');

module.exports = (app) => {
	router.use(protect);
	router
		.route('/')
		.get(notificationController.getNotifications)
		.post(notificationController.createNotification);

	router
		.route('/mark-all-seen')
		.get(notificationController.markAllSeenNotification);
	app.use('/api/notifications', router);
};
