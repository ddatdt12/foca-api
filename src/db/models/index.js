const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
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
// fs.readdirSync(__dirname)
// 	.filter((file) => {
// 		return (
// 			file.indexOf('.') !== 0 &&
// 			file !== basename &&
// 			file.slice(-3) === '.js'
// 		);
// 	})
// 	.forEach((file) => {
// 		const model = require(path.join(__dirname, file))(
// 			sequelize,
// 			Sequelize.DataTypes
// 		);
// 		db[model.name] = model;
// 	});

// Object.keys(db).forEach((modelName) => {
// 	if (db[modelName].associate) {
// 		db[modelName].associate(db);
// 	}
// });

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
module.exports = db;
