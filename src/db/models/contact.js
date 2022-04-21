'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	class Contact extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Contact.init(
		{
			realName: DataTypes.STRING,
			address: DataTypes.STRING,
			test: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'contact',
		}
	);
	return Contact;
};
