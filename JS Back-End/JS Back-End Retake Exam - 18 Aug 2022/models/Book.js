const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
		minLength: [2, 'Title must be at least 2 characters long'],
	},
	author: {
		type: String,
		required: [true, 'Author is required'],
		minLength: [5, 'Title must be at least 5 characters long'],
	},
	image: {
		type: String,
		required: [true, 'Image is required'],
		match: [/^https?:\/\/.+$/i, 'Invalid image URL'],
	},
	review: {
		type: String,
		required: [true, 'Review is required'],
		minLength: [10, 'Review must be at least 10 characters long'],
	},
	genre: {
		type: String,
		required: [true, 'Genre is required'],
		minLength: [3, 'Genre must be at least 3 characters long'],
	},
	stars: {
		type: Number,
		required: [true, 'Stars number is required'],
		min: [1, 'Minimum value must be at least 1'],
		max: [5, 'Maximum value must be at most 5'],
	},
	wishingList: {
		type: [mongoose.Types.ObjectId],
		ref: 'User',
	},
	owner: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
