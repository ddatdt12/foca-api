const AppError = require('../utils/AppError');

function validateRequest(req, next, schema) {
	const options = {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true, // remove unknown props
	};
	const { error, value } = schema.validate(req.body, options);
	if (error) {
		next(
			new AppError(
				`Validation error: ${error.details
					.map((x) => x.message)
					.join(', ')}`,
				422
			)
		);
	} else {
		req.body = value;
		next();
	}
}

module.exports = {
	validateRequest,
};
