'use strict';
const { Model, DataTypes } = require('sequelize');
const Utils = require('../../utils');

module.exports = (sequelize) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.Order);
			this.hasMany(models.CartItem);
		}
		comparePassword = async (password) => {
			const isMatch = await Utils.comparePassword(
				password,
				this.password
			);
			this.password = undefined;
			return isMatch;
		};
	}

	User.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: { type: DataTypes.STRING, allowNull: false },
			phoneNumber: {
				type: DataTypes.STRING,
			},
			role: {
				type: DataTypes.ENUM('ADMIN', 'USER'),
				defaultValue: 'USER',
			},
			photoUrl: {
				type: DataTypes.STRING(3000),
			},
			fullName: {
				type: DataTypes.VIRTUAL,
				get() {
					return `${this.firstName} ${this.lastName}`;
				},
				set(value) {
					throw new Error('Do not try to set the `fullName` value!');
				},
			},
			email: {
				type: DataTypes.VIRTUAL,
				get() {
					return `${this.username}@gm.uit.edu.vn`;
				},
				set(value) {
					throw new Error('Do not try to set the `email` value!');
				},
			},
		},
		{
			sequelize,
			modelName: 'user',
		}
	);
	User.beforeSave(async (user) => {
		const passwordChanged = user.changed('password');
		if (passwordChanged) {
			const hashedPassword = await Utils.hashPassword(user.password);
			user.password = hashedPassword;
		}
	});
	return User;
};
