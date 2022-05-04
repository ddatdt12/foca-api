const express = require('express');

const router = express.Router();
const InterestProdController = require('../../controllers/buyer/InterestController');

router
	.route('/')
	.get(InterestProdController.getInterestedProducts)
	.post(InterestProdController.addInterestedProduct);
router.route('/:id').delete(InterestProdController.deteteInterestedProduct);

module.exports = router;
