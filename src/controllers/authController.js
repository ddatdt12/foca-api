const jwt = require('jsonwebtoken');

const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { User } = require('../db/models');
//@desc         Login
//@route        POST /api/auth/login
//@access       PUBLIC
const login = catchAsync(async (req, res, next) => {
	const { username, password } = req.body;

	const user = await User.findOne({
		where: {
			username: username ?? null,
		},
	});

	if (!user || !(await user.comparePassword(password))) {
		return next(new AppError('Username or password is wrong', 404));
	}

	createSendToken(user, 200, res);
});
//@desc         Auth
//@route        GET /api/auth
//@access       PUBLIC
const authVerify = catchAsync(async (req, res, next) => {
	res.status(200).json({ message: 'Auth success', data: req.user });
});
//@desc         update me
//@route        POST /api/me
//@access       PUBLIC
const updateMe = catchAsync(async (req, res, next) => {
	const user = await User.update(
		{ ...req.body },
		{
			where: {
				id: req.user.id,
			},
		}
	);

	createSendToken(user, 200, res);
});

//@desc        	Register
//@route        POST /api/auth/login
//@access       PUBLIC
const register = catchAsync(async (req, res, next) => {
	const {
		username,
		firstName,
		lastName,
		phoneNumber,
		photoUrl,
		confirmPassword,
		password,
	} = req.body;

	if (password !== confirmPassword) {
		return next(new AppError('Password not match', 400));
	}

	const newUser = await User.create({
		username,
		firstName,
		lastName,
		password,
		phoneNumber,
		photoUrl,
	});
	newUser.password = undefined;
	createSendToken(newUser, 200, res);
});
const createSendToken = (user, statusCode, res) => {
	const accessToken = signToken(user.id);

	res.status(statusCode).json({
		accessToken,
		user,
	});
};

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

module.exports = { login, register, updateMe, authVerify };
