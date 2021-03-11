const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const SALT_FACTOR = 10;

const userSchema = new mongoose.Schema({
	userIdx: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true, },
	userid: { type: String, required: true, unique: true },
	userpw: { type: String },
	email: { type: String },
	provider: {type: String, default: ''},
	authToken: {type: String, default: ''},
}, {
	versionKey: false,
});

userSchema.pre("save", function (done) {
	let user = this;
	if (!user.isModified("userpw")) {
		return done();
	}
	bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
		if (err) { return done(err); }
		bcrypt.hash(user.userpw, salt, function (err, hash) {
			if (err) { return done(err); }
			user.userpw = hash;
			done();
		});
	});
});

userSchema.methods.checkPassword = function (inputpw, done) {
	bcrypt.compare(inputpw, this.userpw, function (err, isMatch) {
		done(err, isMatch);
	});
};

module.exports = mongoose.model('User', userSchema);