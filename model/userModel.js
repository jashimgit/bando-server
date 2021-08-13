
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	photoUrl: String,
	phone: String
})

module.exports = mongoose.model('user', UserSchema)