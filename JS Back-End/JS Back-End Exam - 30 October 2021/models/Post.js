const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
		minLength: [6, 'The Title should be at least 6 characters.'],
	},
	keyword: {
		type: String,
		required: [true, 'Keyword is required'],
		minLength: [6, 'The Keyword should be at least of 6 characters long'],
	},
	location: {
		type: String,
		required: [true, 'Location is required'],
		maxLength: [15, 'The Location should be a maximum of 15 characters long.'],
	},
	date: {
		type: String,
		required: [true, 'Date is required'],
		// minLength: [10, 'The Date should be exactly 10 characters - "02.02.2021"'],
		// maxLength: [10, 'The Date should be exactly 10 characters - "02.02.2021"'],
		match: [ /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/, 'The Date should be exactly 10 characters - "02.02.2021"']
		// match: [ /^(0[1-9]|[12][0-9]|3[01])[- /.]$/, 'The Date should be exactly 10 characters - "02.02.2021"'],
		// default: () => (new Date()).toISOString().slice(0, 10),
	},
	image: {
		type: String,
		required: [true, 'Image is required'],
		match: [/^https?:\/\/.+$/, 'The Wildlife Image should start with http:// or https://.']
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		minLength: [8, 'The Description should be a minimum of 8 characters long.'],
	},
	ratings: {
		type: Number,
		default: 0
	},
	owner: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	voters: {
		type: [mongoose.Types.ObjectId],
		ref: 'User',
	},
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
