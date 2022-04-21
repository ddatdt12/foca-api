module.exports = {
	development: {
		username: 'tbknlzelebmycy',
		password:
			'1839c8d5263347072ee90cfe80c6501fa0c2e302189fa1b780a48cc7fd70e352',
		database: 'dd97o5ihv0agou',
		host: 'ec2-54-194-147-61.eu-west-1.compute.amazonaws.com',
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
			connectTimeout: 1000,
		},
		pool: {
			// max: 5,
			// min: 0,
			// acquire: 30000,
			// idle: 10000,
			max: 5,
			min: 0,
			idle: 1000,
		},
	},
	test: {
		username: 'tbknlzelebmycy',
		password:
			'1839c8d5263347072ee90cfe80c6501fa0c2e302189fa1b780a48cc7fd70e352',
		database: 'dd97o5ihv0agou',
		host: 'ec2-54-194-147-61.eu-west-1.compute.amazonaws.com',
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	},
	production: {
		username: 'tbknlzelebmycy',
		password:
			'1839c8d5263347072ee90cfe80c6501fa0c2e302189fa1b780a48cc7fd70e352',
		database: 'dd97o5ihv0agou',
		host: 'ec2-54-194-147-61.eu-west-1.compute.amazonaws.com',
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	},
};

// module.exports = {
// 	HOST: 'ec2-54-194-147-61.eu-west-1.compute.amazonaws.com',
// 	USER: 'tbknlzelebmycy',
// 	PASSWORD:
// 		'1839c8d5263347072ee90cfe80c6501fa0c2e302189fa1b780a48cc7fd70e352',
// 	DB: 'dd97o5ihv0agou',
// 	dialect: 'postgres',
// 	pool: {
// 		max: 5,
// 		min: 0,
// 		acquire: 30000,
// 		idle: 10000,
// 	},
// };
