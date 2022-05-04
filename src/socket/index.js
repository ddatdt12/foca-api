const { ValidationError } = require('sequelize');
const { Server } = require('socket.io');
const { getRooms, getMessages, seenMessage } = require('./admin');
const {
	getMessagesWithAdmin,
	sendMessage,
	getRoomWithAdmin,
	getRoomMembers,
} = require('./user');

const activeUsers = new Map();

const ConnectSocket = (server) => {
	const io = new Server(server, {
		cors: { origin: true, credentials: true },
	});
	io.use((socket, next) => {
		if (socket.handshake.auth.token) {
			//Just simple authentication
			try {
				socket.userId = parseInt(socket.handshake.auth.token);
				return next();
			} catch (error) {
				return next(new Error('Authentication error'));
			}
		}
		next(new Error('Please login to continue'));
	});
	io.on('connection', (socket) => {
		///Handle khi có connect từ client tới
		console.log('New client connected ' + socket.id);
		console.log('Socket UserId', socket.userId);
		socket.join(socket.userId);

		socket.on('join_room', (data) => {
			console.log('Data ', data);
			socket.emit('send_message', data);
		});
		socket.on('get_rooms', async (cb) => {
			try {
				const rooms = await getRooms();
				typeof cb === 'function' && cb({ data: rooms, error: null });
			} catch (error) {
				typeof cb === 'function' &&
					cb({ data: null, error: error.message });
			}
		});
		socket.on('get_messages', async (roomId, cb) => {
			try {
				const messages = await getMessages(roomId);
				typeof cb === 'function' && cb({ data: messages, error: null });
			} catch (error) {
				console.log('Error get_messages: ', error);
				typeof cb === 'function' &&
					cb({ data: null, error: error.message });
			}
		});

		socket.on('get_room_with_admin', async (cb) => {
			try {
				const data = await getRoomWithAdmin(socket.userId);
				cb({ data, error: null });
			} catch (error) {
				console.log('Error getRoomWithAdmin', error);
				cb({ data: null, error: error?.message });
			}
		});
		socket.on('send_message', async (data, cb) => {
			console.log('Send message ', data);
			try {
				const message = await sendMessage(JSON.parse(data));
				const members = await getRoomMembers(message.roomId);
				Array.isArray(members) &&
					members.forEach((member) => {
						if (member.id !== socket.userId) {
							io.to(member.id).emit('received_message', message);
						}
					});
				console.log('members', members);
				cb({ data: message, error: null });
			} catch (error) {
				console.log('Error send message', error);
				cb({ data: null, error });
			}
		});
		socket.on('seen_new_message', async (roomId) => {
			try {
				await seenMessage(roomId);
			} catch (error) {
				console.log('Error seen_new_message', error);
			}
		});

		socket.on('disconnect', () => {
			console.log('Client disconnected: ' + socket.userId);
		});
	});
	// testFunction();
};

const sort = (array) => {
	for (let i = 0; i < array.length - 1; i++) {
		for (let j = i + 1; j < array.length; j++) {
			if (!array[i].isOnline && array[j].isOnline) {
				const temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
		}
	}
};

const testFunction = async () => {
	try {
		const message = await sendMessage({
			roomId: 8,
			senderId: 3,
			text: 'Testtt  2',
		});

		await seenMessage(8);
		// getRoomWithAdmin(3)
		// 	.then((data) => {
		// 		console.log('getRoomWithAdmin', JSON.stringify(data, null, 2));
		// 	})
		// 	.catch((err) => {
		// 		console.log('Error get messages with admin', err);
		// 		if (err instanceof ValidationError) {
		// 			const errorMessage = Object.values(err.errors)
		// 				.map((el) => {
		// 					return el;
		// 				})
		// 				.join(' \n');
		// 			console.log('Error message', errorMessage);
		// 		}
		// 	});
	} catch (error) {
		console.log('Error', error);
	}
};
module.exports = ConnectSocket;
