'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('order', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			buyerId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'user', // name of Target model
					key: 'id', // key in Target model that we're referencing
				},
				allowNull: false,
			},
			totalPrice: {
				type: Sequelize.INTEGER,
			},
			surcharge: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			notes: Sequelize.STRING,
			status: {
				type: Sequelize.ENUM(
					'ARRIVED',
					'PENDING',
					'PROCESSED',
					'COMPLETED',
					'CANCELLED'
				),
				defaultValue: 'ARRIVED',
			},
			isReviewed: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
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
		await queryInterface.createTable(
			'order_detail',
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				orderId: {
					type: Sequelize.INTEGER,
					references: {
						key: 'id',
						model: 'order',
					},
					allowNull: false,
				},
				productId: {
					type: Sequelize.INTEGER,
					references: {
						key: 'id',
						model: 'product',
					},
				},
				price: {
					type: Sequelize.INTEGER,
					validate: {
						min: 0,
					},
				},
				quantity: {
					type: Sequelize.INTEGER,
					validate: {
						min: 1,
					},
				},
			},
			{
				uniqueKeys: {
					order_detatil_product_unique: {
						fields: ['productId', 'orderId'],
					},
				},
			}
		);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('order_detail');
		await queryInterface.dropTable('order');
	},
};
