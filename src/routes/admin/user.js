const express = require('express');

const router = express.Router();
const userController = require('../../controllers/buyer/userController');

// router.use(protect);
router.route('/').get(userController.getUsers);
router
	.route('/:id')
	.put(userController.updateUser)
	.delete(userController.deteleUser);

module.exports = router;
