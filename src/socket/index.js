const { Server } = require('socket.io');
const {
	getRooms,
	getMessages,
	seenMessage,
	getNotSeenRooms,
} = require('./admin');
const { User } = require('../db/models');
const { createNotification } = require('./notification');
const { sendMessage, getRoomWithAdmin, getRoomMembers } = require('./user');

const ConnectSocket = (server) => {
	let admin;
	const io = new Server(server, {
		cors: { origin: true, credentials: true },
	});
	global.io = io;
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

		if (!admin) {
			User.findOne({
				where: {
					role: 'ADMIN',
				},
			}).then((user) => {
				admin = user;
			});
		}
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

		socket.on('send_notification_for_admin', async (data, cb) => {
			try {
				if (!admin) {
					admin = await User.findOne({
						where: {
							role: 'ADMIN',
						},
					});
				}
				const noti = await createNotification({
					...JSON.parse(data),
					userId: admin.id,
				});
				io.to(admin.id).emit('received_notification', noti);
				cb?.(null);
			} catch (error) {
				cb?.(error.message);
			}
		});
		socket.on('send_notification', async (data, cb) => {
			try {
				const noti = await createNotification(JSON.parse(data));

				io.to(noti.userId).emit('received_notification', noti);
				cb?.(null);
			} catch (error) {
				console.log('send_notification', error.message);
				cb?.(error.message);
			}
		});

		socket.on('disconnect', () => {
			console.log('Client disconnected: ' + socket.userId);
		});
	});
	// testFunction(admin);
};

const testFunction = async (admin) => {
	console.log(admin);
	// try {
	// 	try {
	// 		const noti = await createNotification({
	// 			message: 'Welcome to my app',
	// 			iconType: 'SUCCESS',
	// 			userId: 2,
	// 		});
	// 		console.log('Noti', JSON.stringify(noti, null, 2));
	// 	} catch (error) {
	// 		console.log('createNotification error', error);
	// 	}
	// } catch (error) {
	// 	console.log('Error', error);
	// }
};
module.exports = ConnectSocket;
