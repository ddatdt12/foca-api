const { Order, User, OrderDetail, Product, CartItem } = require('.');

const associate = () => {
	// define association here

	//Order - User
	Order.belongsTo(User, { as: 'buyer' });
	User.hasMany(Order, { as: 'orders', foreignKey: 'buyerId' });

	//Order detail - 1:1 -  Product - 1:n - Order
	OrderDetail.belongsTo(Order, {
		as: 'order',
	});
	Order.hasMany(OrderDetail, {
		as: 'orderDetails',
		foreignKey: 'orderId',
	});
	OrderDetail.belongsTo(Product, {
		as: 'product',
	});
	Product.hasMany(OrderDetail, {
		as: 'orderDetails',
	});

	//User - 1:n - CartItem
	User.hasMany(CartItem, { as: 'cartItems' });
	CartItem.belongsTo(User, { as: 'user' });
	CartItem.belongsTo(Product, { as: 'product' });
};

module.exports = associate;
