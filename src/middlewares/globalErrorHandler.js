const { ValidationError } = require('sequelize');
const AppError = require('../utils/AppError');

const globalErrorHandler = (err, req, res, next) => {
	//Log to console for dev
	console.log(err.message);
	let error = Object.create(err);

	// if (error instanceof ValidationError) {
	// 	const errorMessage = Object.values(error.errors)
	// 		.map((el) => el.message)
	// 		.join(' \n');
	// 	error = new AppError(errorMessage, 400);
	// }
	res.status(error.statusCode || 500).json({
		success: false,
		message: error.message || 'Server error',
	});
};

module.exports = globalErrorHandler;
