const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		minLength:[2, 'The name should be at least 2 characters.'],
	},
	image: {
		type: String,
		required: [true, 'Photo image is required'],
		match: [/^https?:\/\/.+$/, 'The photo image should start with http:// or https://'],
	},
	age: {
		type: Number,
		required: [true, 'Age is required'],
		min: [1, 'The age should be between 1 and 100'],
		max: [100, 'The age should be between 1 and 100'],
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		minLength: [5, 'The description should be at least 5 and no longer than 50 characters.'],
		maxLength: [50, 'The description should be at least 5 and no longer than 50 characters.'],
	},
	location: {
		type: String,
		required: [true, 'Location is required'],
		minLength: [5, 'The location should be at least 5 and no longer than 50 characters'],
		maxLength: [50, 'The location should be at least 5 and no longer than 50 characters'],
	},
	owner: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	commentList: [{
			userId: {
				type: mongoose.Types.ObjectId,
				ref: 'User',
			},
			comment: {
				type: String,
			},
	}],
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
