const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
		type: String,
		required: [true, 'Username is required'],
		unique: true,
		minLength: [3, 'The username should be at least 3 characters long'],
	},
	hashedPassword: {
		type: String,
		required: [true, 'Password is required'],

	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
