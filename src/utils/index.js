const bcrypt = require('bcrypt');
const Utils = {
	comparePassword: async (myPlaintextPassword, hash) => {
		if (!myPlaintextPassword || !hash) return false;
		const isMatch = await bcrypt.compare(myPlaintextPassword, hash);
		return isMatch;
	},
	hashPassword: async (password) => {
		const hash = await bcrypt.hash(password, 10);
		return hash;
	},
	excludeFields(object, ...excludedFields) {
		const newObj = {};
		Object.keys(object).forEach((el) => {
			if (!excludedFields.includes(el)) newObj[el] = object[el];
		});
		return newObj;
	},
	filterObject(object, ...allowedFields) {
		const newObj = {};
		Object.keys(object).forEach((el) => {
			if (allowedFields.includes(el)) newObj[el] = object[el];
		});
		return newObj;
	},
	convertBooleanQuery(object, ...fields) {
		Object.keys(object).forEach((el) => {
			if (fields.includes(el)) object[el] = object[el] === '1';
		});
	},
	objIsEmpty(obj) {
		return Object.keys(obj).length === 0;
	},
	convertNestedObjectQuery(objectName, object) {
		const newObj = {};
		Object.keys(object).forEach((k) => {
			newObj[`${objectName}.${k}`] = object[k];
		});

		return newObj;
	},

	validateEmail(email) {
		const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		return re.test(email);
	},
};
module.exports = Utils;
