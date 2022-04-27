const { ValidationError } = require('sequelize');
const AppError = require('../utils/AppError');
const getErrorMessage = (type, path) => {
	type = typeof type === 'string' ? type.toLowerCase() : type;
	switch (type) {
		case 'notnull violation':
			return `${path} is required`;
		case 'string violation':
			return `${path} must be a string`;
		case 'unique violation':
			return `${path} already exists`;
		case 'validation error':
			return `${path} is not valid`;
		default:
			return `${path} is not valid`;
	}
};
const globalErrorHandler = (err, req, res, next) => {
	//Log to console for dev
	console.log(err.message);
	let error = Object.create(err);

	console.log('Global Error: ', error);
	if (error instanceof ValidationError) {
		const errorMessage = Object.values(error.errors)
			.map((el) => {
				const message = getErrorMessage(el.type, el.path);
				return message;
			})
			.join(' \n');
		error = new AppError(errorMessage, 400);
	}
	res.status(error.statusCode || 500).json({
		success: false,
		statusCode: error.statusCode || 500,
		message: error.message || 'Server error',
	});
};

module.exports = globalErrorHandler;
