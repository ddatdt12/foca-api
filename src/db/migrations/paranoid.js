module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('product', 'deletedAt', {
			allowNull: true,
			type: Sequelize.DATE,
		});
	},

	down: (queryInterface) => {
		return queryInterface.removeColumn('product', 'deletedAt');
	},
};
