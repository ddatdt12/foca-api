const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');

const globalErrorHandler = require('./src/middlewares/globalErrorHandler');
const fs = require('fs');
const path = require('path');
const AppError = require('./src/utils/AppError');
require('./src/db/models');

const routesDirName = `${__dirname}/src/routes/`;
//Config
const app = express();
app.use(
	cors({
		origin: true,
		credentials: true,
	})
);

app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

app.get('/', (req, res) => {
	res.send('hello Foca');
});

// Require all routes
fs.readdirSync(routesDirName)
	// .filter((file) => fs.statSync(path.join(routesDirName, file)).isDirectory()) // filter only folder
	.map((folder) => {
		require(path.join(routesDirName, folder))(app);
	});

app.all('*', (req, res, next) => {
	const error = new AppError(
		`Can't find ${req.originalUrl} on this server`,
		404
	);
	next(error);
});

app.use(globalErrorHandler);

module.exports = app;
