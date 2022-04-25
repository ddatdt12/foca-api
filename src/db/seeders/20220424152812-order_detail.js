'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'order_detail',
			[
				{
					orderId: 1,
					productId: 1,
					price: 30000,
					quantity: 2,
				},
				{
					orderId: 1,
					productId: 2,
					price: 15000,
					quantity: 2,
				},
				{
					orderId: 2,
					productId: 1,
					price: 30000,
					quantity: 2,
				},
				{
					orderId: 2,
					productId: 2,
					price: 15000,
					quantity: 2,
				},
			],
			{}
		);
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
