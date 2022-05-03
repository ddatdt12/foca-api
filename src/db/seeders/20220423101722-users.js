'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */

		try {
			await queryInterface.bulkInsert(
				'user',
				[
					{
						firstName: 'Admin',
						lastName: 'Đạt',
						username: '00000000',
						password:
							'$2b$10$dxthlZTi/uIs8e8GlNiKt.JE9W5dGx805zHHu04WfcbW2RpK.xEP6',
						phoneNumber: '0987582042',
						photoUrl:
							'https://firebasestorage.googleapis.com/v0/b/hifi-3ab1d.appspot.com/o/default.jpg?alt=media&token=ed84b493-6c5b-4a1e-ab6e-0b57c4da77af',
						role: 'ADMIN',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						firstName: 'Đỗ Thành',
						lastName: 'Đạt',
						username: '20521164',
						password:
							'$2b$10$dxthlZTi/uIs8e8GlNiKt.JE9W5dGx805zHHu04WfcbW2RpK.xEP6',
						phoneNumber: '0987582042',
						photoUrl:
							'https://firebasestorage.googleapis.com/v0/b/hifi-3ab1d.appspot.com/o/default.jpg?alt=media&token=ed84b493-6c5b-4a1e-ab6e-0b57c4da77af',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						firstName: 'Đỗ Thành',
						lastName: 'Đạt',
						username: '20521163',
						password:
							'$2b$10$dxthlZTi/uIs8e8GlNiKt.JE9W5dGx805zHHu04WfcbW2RpK.xEP6',
						phoneNumber: '0987582042',
						photoUrl:
							'https://firebasestorage.googleapis.com/v0/b/hifi-3ab1d.appspot.com/o/default.jpg?alt=media&token=ed84b493-6c5b-4a1e-ab6e-0b57c4da77af',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						firstName: 'Dat',
						lastName: 'DT',
						username: '20521162',
						password:
							'$2b$10$dxthlZTi/uIs8e8GlNiKt.JE9W5dGx805zHHu04WfcbW2RpK.xEP6',
						phoneNumber: '0987582222',
						photoUrl:
							'https://firebasestorage.googleapis.com/v0/b/hifi-3ab1d.appspot.com/o/default.jpg?alt=media&token=ed84b493-6c5b-4a1e-ab6e-0b57c4da77af',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						firstName: 'Tuấn',
						lastName: 'Trần',
						username: '20521161',
						password:
							'$2b$10$dxthlZTi/uIs8e8GlNiKt.JE9W5dGx805zHHu04WfcbW2RpK.xEP6',
						phoneNumber: '0987582123',
						photoUrl:
							'https://firebasestorage.googleapis.com/v0/b/hifi-3ab1d.appspot.com/o/default.jpg?alt=media&token=ed84b493-6c5b-4a1e-ab6e-0b57c4da77af',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				],
				{}
			);
		} catch (error) {
			console.log('Errro Seeder: ', error);
		}
		await queryInterface.bulkInsert(
			'product',
			[
				{
					name: 'Trà sữa',
					price: 30000,
					image: 'https://cdn.nguyenkimmall.com/images/companies/_1/tin-tuc/kinh-nghiem-meo-hay/n%E1%BA%A5u%20%C4%83n/hong-tra-sua-5.jpg.jpg',
					description: 'Trà sữa ngon vler',
					type: 'DRINK',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Bánh doremon',
					price: 20000,
					image: 'https://cdn.cet.edu.vn/wp-content/uploads/2022/01/banh-ran-doremon.jpg',
					description: 'Bánh doremon Bánh doremon',
					type: 'FOOD',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Bánh su kem',
					price: 30000,
					image: 'https://media.foody.vn/res/g71/702256/prof/s/foody-upload-api-foody-mobile-avar3-jpg-181029145710.jpg',
					description: "Beard Papa's - Đội Cấn",
					type: 'FOOD',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
		await queryInterface.bulkInsert(
			'order',
			[
				{
					totalPrice: 90000,
					notes: 'Cho thêm tí đường đá',
					buyerId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					totalPrice: 120000,
					buyerId: 3,
					notes: 'Không thêm đường, không đá',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 */
		await queryInterface.bulkDelete('user', null, {});
		await queryInterface.bulkDelete('product', null, {});
		await queryInterface.bulkDelete('order', null, {});
		await queryInterface.bulkDelete('order_detail', null, {});
	},
};
