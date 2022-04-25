const express = require('express');

const router = express.Router();
const userController = require('../../controllers/buyer/userController');
const { protect } = require('../../middlewares/auth');

// router.use(protect);
router.route('/').get(userController.getUsers);

module.exports = router;
