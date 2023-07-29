const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
		unique: true,
		minLength: [4, 'Title must be at least 4 characters long'],
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		maxLength: [50, 'Description must be at most 50 characters long'],
	},
	image: {
		type: String,
		required: [true, 'Image is required'],
	},
	isPublic: {
		type: Boolean,
		required: [true, 'Duration is required'],
		default: false
	},
	createdAt: {
		type: String,
		required: [true, 'Created is required'],
		default: () => new Date().toISOString().slice(0, 10),
	},
	owner: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	users: {
		type: [mongoose.Types.ObjectId],
		ref: 'User',
	},
	likes: {
		type: Number,
		required: [true, 'Likes are required'],
		default: 0
	}
});

const Play = mongoose.model('Play', playSchema);

module.exports = Play;
