'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	class Review extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User);
			this.belongsTo(models.Product);
		}
	}
	Review.init(
		{
			userId: DataTypes.INTEGER,
			productId: DataTypes.INTEGER,
			orderId: DataTypes.INTEGER,
			content: DataTypes.STRING,
			rating: {
				type: DataTypes.INTEGER,
				validate: {
					min: 0,
					max: 5,
				},
			},
		},
		{
			sequelize,
			modelName: 'review',
			timestamps: true,
		}
	);
	return Review;
};
