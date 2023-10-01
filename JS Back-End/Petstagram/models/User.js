const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
		minLength: [2, 'The username should be at least 2 characters long.'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		minLength: [10, 'The email should be at least 10 characters long.'],
	},
	hashedPassword: {
		type: String,
		required: [true, 'Password is required'],
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
