const { Room } = require('../db/models');
const getRooms = async () => {
	const rooms = await Room.findAll({
		include: ['members'],
		order: [['updatedAt', 'DESC']],
	});

	return rooms;
};

module.exports = { getRooms };
