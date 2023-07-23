const mongoose = require('mongoose');

const EMAIL_PATTERN = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/i;

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		match: [EMAIL_PATTERN, 'The email should be in the following format: <name>@<domain>.<extension>'],
	},
	hashedPassword: {
		type: String,
		required: [true, 'Password is required'],
	},
	gender: {
		type: String,
		required: [true, 'Gender is required'],
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
