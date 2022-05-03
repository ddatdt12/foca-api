'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	class Product extends Model {}
	Product.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			price: {
				type: DataTypes.INTEGER,
				validate: {
					min: 0,
				},
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: DataTypes.STRING,
			type: DataTypes.ENUM('DRINK', 'FOOD'),
		},
		{
			sequelize,
			modelName: 'product',
			timestamps: true,
		}
	);
	return Product;
};
