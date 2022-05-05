const Joi = require('joi');
const { validateRequest } = require('.');

function createOrderSchema(req, res, next) {
	console.log('middleware createOrderSchema');
	let detailSchema = Joi.object({
		productId: Joi.number().required(),
		price: Joi.number().required(),
		quantity: Joi.number().integer(),
	});

	const schema = Joi.object()
		.keys({
			notes: Joi.string(),
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

function createReviewsForOrderValidator(req, res, next) {
	const reviewSchema = Joi.object().keys({
		orderDetailId: Joi.number().required(),
		rating: Joi.number().integer().min(1).max(5).required(),
		content: Joi.string(),
	});
	const schema = Joi.object().keys({
		reviews: Joi.array().items(reviewSchema).required(),
	});
	validateRequest(req, next, schema);
}

module.exports = {
	createOrderSchema,
	createReviewsForOrderValidator,
};
