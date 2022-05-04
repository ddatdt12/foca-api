'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize) => {
	class InterestProduct extends Model {}
	InterestProduct.init(
		{},
		{
			sequelize,
			modelName: 'interest_product',
			timestamps: true,
		}
	);
	return InterestProduct;
};
