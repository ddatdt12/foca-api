'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('room', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			lastMessage: {
				type: Sequelize.JSONB,
				allowNull: true,
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
		await queryInterface.createTable('message', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			text: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			roomId: {
				type: Sequelize.INTEGER,
				references: {
					key: 'id',
					model: 'room',
				},
				allowNull: false,
			},
			senderId: {
				type: Sequelize.INTEGER,
				references: {
					key: 'id',
					model: 'user',
				},
				allowNull: false,
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

		await queryInterface.createTable('room_member', {
			memberId: {
				type: Sequelize.INTEGER,
				references: { model: 'user', key: 'id' },
				onDelete: 'CASCADE',
				primaryKey: true,
				allowNull: false,
			},
			roomId: {
				type: Sequelize.INTEGER,
				references: { model: 'room', key: 'id' },
				onDelete: 'CASCADE',
				primaryKey: true,
				allowNull: true,
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
		await queryInterface.dropTable('room_member');
		await queryInterface.dropTable('message');
		await queryInterface.dropTable('room');
	},
};
