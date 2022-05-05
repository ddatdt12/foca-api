'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	class Order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.User, { as: 'buyer' });
			this.hasMany(models.OrderDetail, {
				as: 'orderDetails',
			});
		}
	}
	Order.init(
		{
			totalPrice: DataTypes.INTEGER,
			notes: DataTypes.STRING,
			isReviewed: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			status: {
				type: DataTypes.ENUM(
					'PENDING',
					'PROCCESSED',
					'COMPLETED',
					'CANCELLED'
				),
				defaultValue: 'PENDING',
			},
		},
		{
			sequelize,
			modelName: 'order',
			timestamps: true,
		}
	);
	return Order;
};
