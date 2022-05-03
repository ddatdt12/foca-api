const Joi = require('joi');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const filterQuery = (req, res, next) => {
	console.log('filterQuery', req.query);
	let schema = Joi.object({
		type: Joi.string().valid('DRINK', 'FOOD'),
	}).error((errors) => {
		console.log('Errors joi: ', errors);
		errors.forEach((err) => {
			switch (err.code) {
				case 'any.empty':
					err.message = 'Value should not be empty!';
					break;
				case 'string.min':
					err.message = `Value should have at least ${err.local.limit} characters!`;
					break;
				case 'string.max':
					err.message = `Value should have at most ${err.local.limit} characters!`;
					break;
				default:
					break;
			}
		});
		return errors;
	});

	const options = {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true, // remove unknown props
	};
	const { error, value } = schema.validate(req.query, options);
	if (error) {
		return next(
			new AppError(
				`Validation error: ${error.details
					.map((x) => x.message)
					.join(', ')}`,
				422
			)
		);
	}
	req.query = value;
	next();
};

module.exports = {
	filterQuery,
};
