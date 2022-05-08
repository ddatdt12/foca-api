const Joi = require('joi');
const { Sequelize } = require('../db/models');

const filterGetProductsQuery = (req, res, next) => {
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
const filterGetOrdersQuery = (req, res, next) => {
	let schema = Joi.object({
		status: Joi.string().valid(
			'ARRIVED',
			'PENDING',
			'PROCESSED',
			'COMPLETED',
			'CANCELLED'
		),
		limit: Joi.string().default('10'),
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

const cleanupQuery = (query) => {
	//Copy req.query
	const reqQuery = { ...query };
	let filterQuery = {};
	//Fields to exclude
	const removeFields = ['select', 'sort', 'page', 'limit', 'q'];

	//Loop over removeFields and delete them from reqStr
	removeFields.forEach((param) => delete reqQuery[param]);

	if (query.q) {
		reqQuery.name = {
			[Sequelize.Op.iLike]: '%' + query.q + '%',
		};
	}

	if (query.limit) {
		filterQuery.limit = parseInt(query.limit);
		console.log('query.limit check', filterQuery);
	}
	filterQuery = {
		where: {
			...reqQuery,
		},
		...filterQuery,
	};
	return filterQuery;
};

module.exports = {
	filterGetProductsQuery,
	filterGetOrdersQuery,
	cleanupQuery,
};
