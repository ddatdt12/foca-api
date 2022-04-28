const { User } = require('../../db/models');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');
//@desc         Get Users
//@route        POST /api/auth/login
//@access       PUBLIC
const getUsers = catchAsync(async (req, res) => {
	const users = await User.findAll();
	res.status(200).json({
		message: 'Get all users successfully',
		data: users,
	});
});
//@desc        	Update user
//@route        POST /api/auth/login
//@access       PUBLIC
const updateUser = catchAsync(async (req, res) => {
	const users = await User.update(
		{},
		{
			where: {},
		}
	);
	res.status(200).json({
		message: 'Get all users successfully',
		data: users,
	});
});
//@desc         Detele User
//@route        POST /api/users/:id
//@access       PUBLIC
const deteleUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findByPk(id);

	if (!user) {
		return next(new AppError('User not found', 404));
	}

	await user.destroy();
	res.status(200).json({
		message: 'Delete user successfully',
		data: null,
	});
});

module.exports = { getUsers, deteleUser, updateUser };
