const express = require('express');

const router = express.Router();
const InterestController = require('../../controllers/buyer/InterestController');

router
	.route('/')
	.get(InterestController.getInterestedProducts)
	.post(InterestController.addInterestedProduct);
router.route('/:id').delete(InterestController.deteteInterestedProduct);

module.exports = router;
