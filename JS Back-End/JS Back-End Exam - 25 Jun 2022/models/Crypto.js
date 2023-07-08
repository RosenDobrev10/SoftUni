const mongoose = require('mongoose');

const IMAGEURL_PATTERN = /^https?:\/\/.+$/i;

const cryptoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		minLength: [2, 'Name must be at least 2 characters long'],
	},
	price: {
		type: Number,
		required: [true, 'Price is required'],
		min: [0, 'Price must be a positive number'],
	},
	imageUrl: {
		type: String,
		required: [true, 'Image URL is required'],
		validate: {
			validator: (value) => IMAGEURL_PATTERN.test(value),
			message: 'Invalid image URL',
		},
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		minLength: [10, 'Description must be at least 10 characters long'],
	},
	payment: {
		type: String,
		required: [true, 'Payment method is required'],
		enum: {
			values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
			message: '{VALUE} is not supported',
		},
	},
	owner: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	buyers: {
		type: [mongoose.Types.ObjectId],
		ref: 'User'
	}
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
