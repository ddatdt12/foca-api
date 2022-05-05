'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('review', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			orderDetailId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					key: 'id',
					model: 'order_detail',
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
			content: {
				type: Sequelize.STRING,
			},
			rating: {
				type: Sequelize.INTEGER,
				validate: {
					min: 0,
					max: 5,
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
		await queryInterface.dropTable('review');
	},
};
