const express = require('express');

const router = express.Router();
const notificationController = require('../../controllers/buyer/notificationController');

router
	.route('/')
	.get(notificationController.getNotifications)
	.post(notificationController.createNotification);

router
	.route('/mark-all-seen')
	.get(notificationController.markAllSeenNotification);

module.exports = router;
