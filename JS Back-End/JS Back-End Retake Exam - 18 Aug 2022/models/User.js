const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
		minLength: [4, 'Username must be at least 4 characters long'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		minLength: [10, 'Email must be at least 10 characters long'],
	},
	hashedPassword: {
		type: String,
		required: [true, 'Password is required'],
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
