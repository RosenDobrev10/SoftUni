const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		match: [/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/g, 'Invalid email address'] // СМЕНИ РЕГЕКСА СПОРЕД ЗАДАНИЕТО 
	},
    username: {
		type: String,
		required: [true, 'Username is required'],
		unique: true,
		match: [/^[a-zA-Z0-9]+$/g, 'Invalid username']	// СМЕНИ РЕГЕКСА СПОРЕД ЗАДАНИЕТО 
	},
	hashedPassword: {
		type: String,
		required: [true, 'Password is required'],
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
