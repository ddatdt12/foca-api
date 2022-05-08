const { ValidationError } = require('sequelize');
const { Server } = require('socket.io');
const { validateNotiData } = require('../validator/notification');
const {
	getRooms,
	getMessages,
	seenMessage,
	getNotSeenRooms,
} = require('./admin');
const { createNotification } = require('./notification');
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
		socket.on('get_not_seen_conversations', async (cb) => {
			try {
				const notSeenRoomIds = await getNotSeenRooms();
				typeof cb === 'function' && cb(notSeenRoomIds);
			} catch (error) {
				console.log('Error get_not_seen_conversations: ', error);
				typeof cb === 'function' && cb([]);
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
			try {
				const message = await sendMessage(JSON.parse(data));
				const members = await getRoomMembers(message.roomId);
				Array.isArray(members) &&
					members.forEach((member) => {
						if (member.id !== socket.userId) {
							io.to(member.id).emit('received_message', message);
						}
					});
				cb({ data: message, error: null });
			} catch (error) {
				console.log('Error send message', error);
				cb({ data: null, error });
			}
		});
		socket.on('seen_new_message', async (roomId, cb) => {
			try {
				await seenMessage(roomId);
				cb(true);
			} catch (error) {
				cb(false);
				console.log('Error seen_new_message', error);
			}
		});

		//Notification
		socket.on('send_notification', async (data, cb) => {
			try {
				const noti = await createNotification(data);
				io.to(noti.userId).emit('received_notification', noti);
				cb(null);
			} catch (error) {
				cb(error.message);
			}
		});
		socket.on('send_notification_for_admin', async (data, cb) => {
			try {
				await createNotification(data);
				cb(null);
			} catch (error) {
				cb(error.message);
			}
		});
		socket.on('send_notification', async (data, cb) => {
			try {
				await createNotification(data);
				cb(null);
			} catch (error) {
				cb(error.message);
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
		try {
			const noti = await createNotification({
				message: 'Welcome to my app',
				iconType: 'SUCCESS',
				userId: 2,
			});
			console.log('Noti', JSON.stringify(noti, null, 2));
		} catch (error) {
			console.log('createNotification error', error);
		}
		// const notSeenRoomIds = await getNotSeenRooms();
		// // console.log('notSeenRoomIds: ', notSeenRoomIds);
		// const message = await sendMessage({
		// 	roomId: 8,
		// 	senderId: 3,
		// 	text: 'Testtt3',
		// });
		// console.log('message: ', JSON.stringify(message, null, 2));
		// console.log('sender full fame: ', message.sender.fullName);
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
