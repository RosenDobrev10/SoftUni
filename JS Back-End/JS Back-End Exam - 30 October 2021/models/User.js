const mongoose = require('mongoose');

const EMAIL_PATTERN = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/i;

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		match: [EMAIL_PATTERN, 'The email should be in the following format: <name>@<domain>.<extension>']
	},
	hashedPassword: {
		type: String,
		required: [true, 'Password is required'],
	},
	firstName: {
		type: String,
		required: [true, 'First name is required'],
		minLength: [3, 'The first name should be at least 3 characters long'],
		match: [/^[a-zA-Z]+$/i, 'The first name should contain only English letters']
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
		minLength: [5, 'The last name should be at least 5 characters long and contains only English letters'],
		match: [/^[a-zA-Z]+$/i, 'The last name should cointain only English letters']
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
