const { CartItem } = require('../db/models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
//@desc         get my cart
//@route        GET /api/me/cart
//@access       PRIVATE
const getCart = catchAsync(async (req, res) => {
	const cart = await CartItem.findAll({
		where: {
			userId: req.user.id,
		},
		include: 'product',
	});
	res.status(200).json({
		message: 'Get user cart successfully',
		data: cart,
	});
});
//@desc         create cart item
//@route        POST /api/me/cart
//@access       PRIVATE
const createCartItem = catchAsync(async (req, res) => {
	const { productId, quantity } = req.body;
	let cartItem = await CartItem.findOne({
		where: {
			userId: req.user.id,
			productId: productId,
		},
	});

	if (cartItem) {
		cartItem.quantity += quantity;
		await cartItem.save();
	} else {
		cartItem = await CartItem.create(
			{
				userId: req.user.id,
				quantity,
				productId,
			},
			{
				include: ['product'],
			}
		);
	}

	res.status(200).json({
		message: 'Update user cart successfully',
		data: cartItem,
	});
});
//@desc         Update cart item
//@route        PUT /api/me/cart/:id
//@access       PUBLIC
const updateCartItem = catchAsync(async (req, res, next) => {
	const { quantity } = req.body;
	if (!quantity || quantity < 1) {
		return next(new AppError('Quantity must be greater than 0', 400));
	}
	const cart = await CartItem.findByPk(req.params.id);

	if (!cart) {
		return next(new AppError('Cart item not found', 404));
	}

	if (cart.userId !== req.user.id) {
		return next(
			new AppError('You are not allowed to update this cart item', 403)
		);
	}

	cart.quantity = quantity;
	await cart.save();
	res.status(200).json({
		message: 'Update cart item successfully',
		data: cart,
	});
});

//@desc         delete cart item
//@route        DELETE /api/me/cart/:id
//@access       PUBLIC
const deleteCartItem = catchAsync(async (req, res, next) => {
	console.log('Order: ', req.body);
	const itemsDeletedNum = await CartItem.destroy({
		where: {
			id: req.params.id,
		},
	});

	res.status(200).json({
		message: 'delete item successfully',
		data: {
			num: itemsDeletedNum,
		},
	});
});

module.exports = { getCart, createCartItem, updateCartItem, deleteCartItem };
