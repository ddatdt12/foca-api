'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
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
			type: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'product',
		}
	);
	return Product;
};
