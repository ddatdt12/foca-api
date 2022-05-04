const { Message, User, Room, RoomMember, sequelize } = require('../db/models');
const getRoomWithAdmin = async (userId) => {
	const admin = await User.findOne({
		where: {
			role: 'ADMIN',
		},
	});

	if (!admin) {
		throw new Error('Admin not found');
	}

	const roomMember = await RoomMember.findOne({
		where: {
			memberId: userId,
		},
		attributes: ['roomId'],
	});
	let room;
	if (!roomMember) {
		room = await sequelize.transaction(async (t) => {
			const room = await Room.create(
				{
					lastMessage: null,
				},
				{
					transaction: t,
				}
			);
			const user = await User.findByPk(userId, {
				transaction: t,
			});
			await room.addMember(admin, { transaction: t });
			await room.addMember(user, { transaction: t });

			return room;
		});
	} else {
		room = await Room.findByPk(roomMember.roomId, {
			include: [
				'members',
				{
					association: 'messages',
					include: 'sender',
				},
			],
		});
	}

	return room;
};
const getRoomMembers = async (roomId) => {
	const room = await Room.findByPk(roomId);

	return (
		room?.getMembers({
			raw: true,
		}) ?? []
	);
};

const sendMessage = async (newMessage) => {
	const createdMessage = await sequelize.transaction(async (t) => {
		const message = await Message.create(
			{
				...newMessage,
			},
			{
				include: ['sender'],
				transaction: t,
			}
		);

		const returnedMessage = message.get();

		const room = await Room.findByPk(newMessage.roomId, {
			include: [
				{
					association: 'members',
					attributes: ['id'],
				},
			],
		});

		if (!room.members.map((m) => m.id).includes(newMessage.senderId)) {
			throw new Error('User not in room');
		}
		room.lastMessage = message;
		await room.save({
			transaction: t,
		});

		returnedMessage.sender = await message.getSender({
			raw: true,
		});
		return returnedMessage;
	});
	return createdMessage;
};

module.exports = { getRoomWithAdmin, getRoomMembers, sendMessage };
