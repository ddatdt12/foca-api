'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'interest_product',
			{
				id: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.INTEGER,
					autoIncrement: true,
				},
				productId: {
					allowNull: false,
					type: Sequelize.INTEGER,
					references: {
						key: 'id',
						model: 'product',
					},
				},
				userId: {
					allowNull: false,
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
			},
			{
				uniqueKeys: {
					interest_product_unique: {
						fields: ['productId', 'userId'],
					},
				},
			}
		);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('interest_product');
	},
};
