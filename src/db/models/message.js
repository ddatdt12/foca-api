'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	class Message extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}
	Message.init(
		{
			text: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			senderId: {
				type: DataTypes.INTEGER,
				references: {
					key: 'id',
					model: 'user',
				},
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'message',
			timestamps: true,
		}
	);
	return Message;
};
