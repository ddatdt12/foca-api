const Joi = require('joi');
const { Op } = require('sequelize');
const { sequelize } = require('../db/models');
const filterGetProductsQuery = (req, res, next) => {
	let rangeSchema = Joi.object({
		gt: Joi.string(),
		gte: Joi.string(),
		lt: Joi.string(),
		lte: Joi.string(),
	});
	let schema = Joi.object({
		type: Joi.string().valid('DRINK', 'FOOD'),
		limit: Joi.string().default('10'),
		sort: Joi.string(),
		q: Joi.string(),
		price: rangeSchema,
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
			[Op.iLike]: '%' + query.q + '%',
		};
	}

	if (query.sort) {
		const allowedFields = ['rating', 'price'];
		const sortBy = query.sort.split(',').map((s) => {
			const typeSort = s.includes('-') ? 'desc' : 'asc';
			const field = s.replace('-', '').trim();
			if (!allowedFields.includes(field)) {
				return ['createdAt', 'desc'];
			}
			return [
				field === 'rating'
					? sequelize.literal('"averageRating"')
					: field,
				typeSort,
			];
		});
		filterQuery.order = sortBy;
	}

	if (query.price) {
		Object.keys(reqQuery.price).forEach((key) => {
			if (reqQuery.price[key]) {
				const value = reqQuery.price[key];
				if (!isNaN(value)) {
					reqQuery['price'][Op[key]] = value;
				}
				delete reqQuery.price[key];
			}
		});
	}

	if (query.limit) {
		filterQuery.limit = parseInt(query.limit);
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
