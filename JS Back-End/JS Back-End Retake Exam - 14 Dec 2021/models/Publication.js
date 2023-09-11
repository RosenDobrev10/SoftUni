const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
		minLength: [6, 'The Title should be a minimum of 6 characters long'],
	},
	technique: {
		type: String,
		required: [true, 'Painting technique is required'],
		maxLength: [15, 'The Painting technique should be a maximum of 15 characters long'],
	},
	picture: {
		type: String,
		required: [true, 'Art picture is required'],
		match: [/^https?:\/\/.+$/, 'The Art picture should start with http:// or https://']
	},
	certificate: {
		type: String,
		required: [true, 'Certificate of authenticity is required'],
		enum: {
			values: ['Yes', 'No'],
			message: 'The Certificate of authenticity there must be value "Yes" or "No"'
		}
	},
	owner: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	sharers: {
		type: [mongoose.Types.ObjectId],
		ref: 'User',
	},
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;
