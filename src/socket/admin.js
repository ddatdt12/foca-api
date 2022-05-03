const { Room, Message } = require('../db/models');
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

module.exports = { getRooms, getMessages };
