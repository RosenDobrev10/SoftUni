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
	skills: {
		type: String,
		required: [true, 'Description of skills is required'],
		maxLength: [40, 'The description of skills should be a maximum of 40 characters long']
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
