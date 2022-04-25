const Joi = require('joi');
const { validateRequest } = require('.');

function createUserSchema(req, res, next) {
	const schema = Joi.object()
		.keys({
			username: Joi.string(),
			firstName: Joi.string(),
			lastName: Joi.string(),
			phoneNumber: Joi.string()
				.length(10)
				.pattern(/^[0-9]+$/),
			photoUrl: Joi.string().uri(),
			password: Joi.string().min(6),
			confirmPassword: Joi.string().valid(Joi.ref('password')),
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
	const schema = Joi.object()
		.keys({
			username: Joi.string(),
			firstName: Joi.string(),
			lastName: Joi.string(),
			phoneNumber: Joi.string()
				.length(10)
				.pattern(/^[0-9]+$/),
			photoUrl: Joi.string().uri(),
			password: Joi.string().min(6),
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

module.exports = {
	createUserSchema,
	updateUserSchema,
};
