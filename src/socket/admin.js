const { Room, Message, sequelize } = require('../db/models');
const getNotSeenRooms = async () => {
	const rooms = await Room.findAll({
		where: {
			isSeen: false,
		},
		attributes: ['id'],
	});

	return rooms.map((room) => room.id);
};
const getRooms = async () => {
	const rooms = await Room.findAll({
		include: ['members'],
		order: [['updatedAt', 'DESC']],
	});

	return rooms;
};

const getMessages = async (roomId) => {
	const rooms = await Message.findAll({
		where: {
			roomId,
		},
		order: [['createdAt', 'ASC']],
		raw: true,
	});

	return rooms;
};

const seenMessage = async (roomId) => {
	await sequelize.transaction(async (t) => {
		const room = await Room.findByPk(roomId, {
			lock: true,
			transaction: t,
		});
		if (room && room.isSeen === false) {
			room.isSeen = true;
			await room.save({
				transaction: t,
			});
		}
	});
};

module.exports = { getRooms, getMessages, seenMessage, getNotSeenRooms };
