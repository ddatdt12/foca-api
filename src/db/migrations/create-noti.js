'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('notification', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			message: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			iconType: {
				type: Sequelize.ENUM('SUCCESS', 'MONEY', 'ERROR'),
				allowNull: false,
				defaultValue: 'SUCCESS',
			},
			isSeen: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					key: 'id',
					model: 'user',
				},
			},
			orderId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					key: 'id',
					model: 'order',
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('notification');
	},
};
