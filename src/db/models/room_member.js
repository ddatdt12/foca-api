'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	class RoomMember extends Model {}
	RoomMember.init(
		{},
		{
			sequelize,
			modelName: 'room_member',
		}
	);
	return RoomMember;
};
