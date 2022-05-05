'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('user', {
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
			role: {
				type: Sequelize.ENUM('ADMIN', 'USER'),
				defaultValue: 'USER',
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
		await queryInterface.createTable('product', {
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
			description: {
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

		await queryInterface.createTable('cart_item', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'user', // name of Target model
					key: 'id', // key in Target model that we're referencing
				},
				allowNull: false,
			},
			productId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'product', // name of Target model
					key: 'id', // key in Target model that we're referencing
				},
				allowNull: false,
			},
			quantity: {
				type: Sequelize.INTEGER,
				validate: {
					min: 1,
				},
				allowNull: false,
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
