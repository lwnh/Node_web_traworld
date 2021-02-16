const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userIdx : mongoose.Schema.Types.ObjectId,
	name : {type : String, required : true,},
	userid : {type : String, required : true, unique : true},
	userpw : {type : String, required : true},
	email : {type : String, required : true},
});

module.exports = mongoose.model('User', userSchema);