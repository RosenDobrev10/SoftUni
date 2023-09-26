const mongoose = require('mongoose');

const NAME_PATTERN = /^[a-zA-Z]+ [a-zA-Z]+$/i;

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		match: [NAME_PATTERN, 'The name should be in the following format -> (firstname lastname) - "Alexandur Petrov"'],
	},
	username: {
		type: String,
		required: [true, 'Username is required'],
		minLength: [5, 'The username should be at least 5 characters long']
	},
	hashedPassword: {
		type: String,
		required: [true, 'Password is required'],
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
