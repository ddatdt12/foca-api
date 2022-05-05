const path = require('path');
const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config').development;
const db = {};

const sequelize = new Sequelize.Sequelize(
	dbConfig.database,
	dbConfig.username,
	dbConfig.password,
	{
		host: dbConfig.host,
		dialect: dbConfig.dialect,
		dialectOptions: dbConfig.dialectOptions,
		pool: dbConfig.pool,
		define: {
			freezeTableName: true,
		},
	}
);

(async () => {
	console.log('Run');
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize);
db.Product = require('./product')(sequelize);
db.Order = require('./order')(sequelize);
db.OrderDetail = require('./order_detail')(sequelize);
db.CartItem = require('./cart_item')(sequelize);
db.Room = require('./room')(sequelize);
db.Message = require('./message')(sequelize);
db.RoomMember = require('./room_member')(sequelize);
db.InterestProduct = require('./interest_product')(sequelize);
db.Review = require('./review')(sequelize);
module.exports = db;
