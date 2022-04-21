const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const EmailService = require('../services/email');
const { User } = require('../db/models');

const VerificationCodeHashMap = new Map();
//@desc         FOR TESTING: Login = uid
//@route        POST /api/auth/login
//@access       PUBLIC

const sendEmailVerification = catchAsync(async (req, res, next) => {
	const { username } = req.body;

	if (!username) {
		return next(new AppError('Please provide username', 400));
	}
	const user = await User.findOne({
		where: {
			username,
		},
	});

	if (user) {
		return next(new AppError('User already exists', 400));
	}

	const email = `${username}@gm.uit.edu.vn`;
	const code = Math.floor(Math.random() * 10000);
	VerificationCodeHashMap.set(email, code);
	console.log('VerificationCodeHashMap : ', VerificationCodeHashMap);
	await EmailService.sendVerificationEmail({
		email,
		subject: 'Account Verification',
		code,
	});
	res.status(200).json({
		message: 'send email successfully',
	});
});

const checkVerificationCode = catchAsync(async (req, res, next) => {
	const { email, code } = req.body;

	if (
		!VerificationCodeHashMap.has(email) ||
		VerificationCodeHashMap.get(email)?.toString() !== code.toString()
	) {
		return next(new AppError('Wrong code', 400));
	}

	res.status(200).json({
		message: 'Code verification successfully',
	});
});

module.exports = { sendEmailVerification, checkVerificationCode };
