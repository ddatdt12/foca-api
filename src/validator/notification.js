const Joi = require('joi');
const { Sequelize } = require('../db/models');

const validateNotiData = (data) => {
	let schema = Joi.object({
		message: Joi.string().required(),
		iconType: Joi.string().valid('SUCCESS', 'MONEY', 'ERROR').required(),
		isSeen: Joi.boolean().default(false),
		userId: Joi.number().required(),
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
	const { error, value } = schema.validate(data, options);
	if (error) {
		error.details.forEach((err) => {
			delete value[err.context.key];
		});
	}
	let errorMessage;
	if (error) {
		errorMessage = `Validation error: ${error.details
			.map((x) => x.message)
			.join(', ')}`;
		throw Error(errorMessage);
	}

	return value;
};

module.exports = {
	validateNotiData,
};
