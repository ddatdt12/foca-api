'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	class CartItem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.User, { as: 'buyer' });
			this.belongsTo(models.Product, { as: 'product' });
		}
	}
	CartItem.init(
		{
			quantity: {
				type: DataTypes.INTEGER,
			},
		},
		{
			sequelize,
			modelName: 'cart_item',
			timestamps: false,
		}
	);
	return CartItem;
};
