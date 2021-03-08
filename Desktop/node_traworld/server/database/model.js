const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
	userIdx: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true, },
	userid: { type: String, required: true, unique: true },
	userpw: { type: String, required: true },
	email: { type: String, required: true },
	salt: { type: String },
}, {
	versionKey: false,
});

module.exports = mongoose.model('User', userSchema);