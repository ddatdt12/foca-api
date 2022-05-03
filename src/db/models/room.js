'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	class Room extends Model {
		static associate(models) {}
	}
	Room.init(
		{
			lastMessage: {
				type: DataTypes.JSONB,
			},
		},
		{
			sequelize,
			modelName: 'room',
			timestamps: true,
		}
	);
	return Room;
};
