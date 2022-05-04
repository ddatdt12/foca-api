const {
	Order,
	User,
	OrderDetail,
	Product,
	CartItem,
	Room,
	Message,
	RoomMember,
	InterestProduct,
} = require('.');

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

	//Chat room
	Room.hasMany(Message, { as: 'messages' });
	Message.belongsTo(Room, { as: 'room' });

	Message.belongsTo(User, {
		as: 'sender',
		foreignKey: 'senderId',
		targetKey: 'id',
	});

	User.belongsToMany(Room, {
		through: RoomMember,
		as: 'rooms',
		foreignKey: 'memberId',
	});
	Room.belongsToMany(User, { through: RoomMember, as: 'members' });

	// Product 1:n - InterestProduct - 1:n - User
	// // Setup a One-to-Many relationship between User and Grant
	// User.hasMany(InterestProduct, {
	// 	as: 'interestedProducts',
	// });
	// InterestProduct.belongsTo(User);

	// // Also setup a One-to-Many relationship between Profile and Grant
	// Product.hasMany(InterestProduct, {
	// 	through: InterestProduct,
	// 	as: 'users',
	// 	foreignKey: 'productId',
	// });
	// InterestProduct.belongsTo(Product);

	User.belongsToMany(Product, {
		through: InterestProduct,
		as: 'interestedProducts',
		foreignKey: 'userId',
	});
	Product.belongsToMany(User, {
		through: InterestProduct,
		as: 'users',
		foreignKey: 'productId',
	});
};

module.exports = associate;
