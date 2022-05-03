const {
	Order,
	User,
	OrderDetail,
	Product,
	CartItem,
	Room,
	Message,
	RoomMember,
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

	User.belongsToMany(Product, {
		through: 'interest_product',
		as: 'interestedProducts',
	});
	Product.belongsToMany(User, {
		through: 'interest_product',
		as: 'users',
	});
};

module.exports = associate;
