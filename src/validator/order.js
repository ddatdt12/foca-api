const Joi = require('joi');
const { validateRequest } = require('.');

function createOrderSchema(req, res, next) {
	let detailSchema = Joi.object({
		productId: Joi.number().required(),
		price: Joi.number().required(),
		quantity: Joi.number().integer(),
	});

	const schema = Joi.object()
		.keys({
			totalPrice: Joi.number().required(),
			notes: Joi.string().required(),
			orderDetails: Joi.array().items(detailSchema).required(),
		})
		.error((errors) => {
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
	validateRequest(req, next, schema);
}

function updateUserSchema(req, res, next) {
	const schema = Joi.object().keys({
		username: Joi.string().required(),
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		phoneNumber: Joi.string().email().required(),
		photoUrl: Joi.string().uri().required(),
		password: Joi.string().min(6).required(),
		confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
	});
	validateRequest(req, next, schema);
}

module.exports = {
	createOrderSchema,
};
