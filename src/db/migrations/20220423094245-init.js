'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			price: {
				type: Sequelize.STRING,
			},
			image: {
				type: Sequelize.STRING,
			},
			decription: {
				type: Sequelize.STRING,
			},
			type: {
				allowNull: false,
				type: Sequelize.ENUM('DRINK', 'FOOD'),
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
		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			firstName: { type: Sequelize.STRING, allowNull: false },
			lastName: { type: Sequelize.STRING, allowNull: false },
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: { type: Sequelize.STRING, allowNull: false },
			phoneNumber: {
				type: Sequelize.STRING,
			},
			photoUrl: {
				type: Sequelize.STRING(2400),
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
		await queryInterface.createTable('orders', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'users', // name of Target model
					key: 'id', // key in Target model that we're referencing
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			totalPrice: {
				type: Sequelize.INTEGER,
			},
			notes: Sequelize.STRING,
			status: {
				type: Sequelize.ENUM('PENDING', 'COMPLETED', 'CANCELLED'),
				defaultValue: 'PENDING',
			},
			createAt: {
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
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.dropAllTables();
	},
};
