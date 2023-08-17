const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		minLength: [10, 'The email is required and should be at least 10 characters long.'],
	},
	hashedPassword: {
		type: String,
		required: [true, 'Password is required'],
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
