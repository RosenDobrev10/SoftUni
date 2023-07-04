const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email is required!'],
		minLength: [10, 'Email must be at least 10 characters long'],
		match: [/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/g, 'Email must be in format <name>@<domain>.<extension> and only English letters are allowed']
	},
	firstName: {
		type: String,
		required: [true, 'First name is required'],
		minLength: [1, 'First name must be at least 1 character long'],
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
		minLength: [1, 'Last name must be at least 1 character long'],
	},
	hashedPassword: {
		type: String,
		required: [true, 'Password is required'],
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
