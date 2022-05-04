const Joi = require('joi');

const filterQuery = (req, res, next) => {
	console.log('filterQuery', req.query);
	let schema = Joi.object({
		type: Joi.string().valid('DRINK', 'FOOD'),
		limit: Joi.string().default('10'),
		q: Joi.string(),
	});

	const options = {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true, // remove unknown props
		errors: {
			wrap: {
				label: '',
			},
		},
	};
	const { error, value } = schema.validate(req.query, options);
	if (error) {
		error.details.forEach((err) => {
			delete value[err.context.key];
		});
	}
	req.query = value;
	next();
};

module.exports = {
	filterQuery,
};
