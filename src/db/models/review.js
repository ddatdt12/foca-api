'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	class Review extends Model {
		static associate(models) {}
	}
	Review.init(
		{
			userId: DataTypes.INTEGER,
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
