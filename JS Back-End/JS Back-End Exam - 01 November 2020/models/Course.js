const mongoose = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const courseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
		minLength: [4, 'Title must be at least 4 characters long'],
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		minLength: [20, 'Description must be at least 20 characters long'],
		maxLength: [50, 'Description must be at most 50 characters long'],
	},
	imageUrl: {
		type: String,
		required: [true, 'Image is required'],
		validate: {
			validator: (value) => URL_PATTERN.test(value),
			message: 'Invalid URL',
		},
	},
	duration: {
		type: String,
		required: [true, 'Duration is required'],
	},
	createdAt: {
		type: String,
		required: [true, 'Created is required'],
		default: () => new Date().toISOString().slice(0, 10),
	},
	users: {
		type: [mongoose.Types.ObjectId],
		ref: 'User',
		default: [],
	},
	userCount: {
		type: Number,
		default: 0,
	},
	owner: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
