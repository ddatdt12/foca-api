'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('interest_product', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			productId: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
				references: {
					key: 'id',
					model: 'product',
				},
			},
			userId: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
				references: {
					key: 'id',
					model: 'user',
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
		await queryInterface.dropTable('interest_product');
	},
};
