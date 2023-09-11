const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
		minLength: [4, 'The username should be at least 4 characters long'],
	},
	hashedPassword: {
		type: String,
		required: [true, 'Password is required'],
	},
	address: {
		type: String,
		required: [true, 'Address is required'],
		maxLength: [20, 'The address should be a maximum of 20 characters long']
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
