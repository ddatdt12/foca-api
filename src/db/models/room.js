'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	class Room extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsToMany(models.User, { through: 'TeamUsers' });
		}
	}
	Room.init(
		{
			members: DataTypes.ARRAY(DataTypes.INTEGER),
			totalPrice: DataTypes.INTEGER,
			notes: DataTypes.STRING,
			status: {
				type: DataTypes.ENUM('PENDING', 'COMPLETED', 'CANCELLED'),
				defaultValue: 'PENDING',
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
