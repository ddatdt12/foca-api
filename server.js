const app = require('./app');
const ConnectSocket = require('./src/socket');
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

ConnectSocket(server);
process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
	console.log(err.name, err.message, err);
	process.exit(1);
});

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	console.log(err);
	server.close(() => {
		process.exit(1);
	});
});
