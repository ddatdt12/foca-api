'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	class OrderDetail extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Order, { as: 'order' });
		}
	}
	OrderDetail.init(
		{
			orderId: {
				type: DataTypes.INTEGER,
				references: {
					key: 'id',
					model: 'order',
				},
				allowNull: false,
			},
			productId: {
				type: DataTypes.INTEGER,
				references: {
					key: 'id',
					model: 'product',
				},
				allowNull: false,
			},
			price: {
				type: DataTypes.INTEGER,
				validate: {
					min: 0,
				},
			},
			quantity: {
				type: DataTypes.INTEGER,
				min: 1,
			},
		},
		{
			sequelize,
			modelName: 'order_detail',
			timestamps: false,
		}
	);
	return OrderDetail;
};
