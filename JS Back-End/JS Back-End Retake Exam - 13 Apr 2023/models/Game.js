const mongoose = require('mongoose');

const IMAGEURL_PATTERN = /^https?:\/\/.+$/i;

const gameSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		minLength: [4, 'Name must be at least 4 characters long'],
	},
	price: {
		type: Number,
		required: [true, 'Price is require'],
		min: [0, 'Price must be a positive number'],
	},
	imageUrl: {
		type: String,
		required: [true, 'ImageURL is required'],
		validate: {
			validator: (value) => IMAGEURL_PATTERN.test(value),
			message: 'Invalid URL',
		},
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		minLength: [10, 'Description must be at least 10 characters long'],
	},
	genre: {
		type: String,
		required: [true, 'Genre is required!'],
		minLength: [2, 'Description must be at least 2 characters long'],
	},
	platform: {
		type: String,
		required: [true, 'Platform is required'],
		enum: {
			values: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
			message: '{VALUE} is not supported',
		},
	},
	owner: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	buyers: {
		type: [mongoose.Types.ObjectId],
		ref: 'User',
	},
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
