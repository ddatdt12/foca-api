'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	class Product extends Model {
		static associate(models) {
			// define association here
		}
	}
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
			paranoid: true,
			modelName: 'product',
			timestamps: true,
		}
	);

	Product.addHook('beforeDestroy', (product) => {
		console.log('beforeDestroy Product: ', product);
	});
	return Product;
};
