const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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

userSchema.methods.checkPassword = function (inputpw, done) {
	bcrypt.compare(inputpw, this.userpw, function (err, isMatch) {
		done(err, isMatch);
	});
};

module.exports = mongoose.model('User', userSchema);