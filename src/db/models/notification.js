'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	class Notification extends Model {
		static associate() {}
	}
	Notification.init(
		{
			message: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			iconType: {
				type: DataTypes.ENUM('SUCCESS', 'MONEY', 'ERROR'),
				allowNull: false,
				defaultValue: 'SUCCESS',
			},
			isSeen: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: 'notification',
		}
	);
	return Notification;
};
