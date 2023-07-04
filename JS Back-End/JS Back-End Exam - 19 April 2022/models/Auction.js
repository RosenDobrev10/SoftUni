const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
		minLength: [4, 'Title must be at least 4 characters long'],
	},
	category: {
		type: String,
		required: [true, 'Category is required'],
		// enum: {
		// 	values: [ 'vehicles', 'Real Estate', 'electronics', 'furniture', 'other',],
		// 	message: '{VALUE} is not supported!',
		// },
	},
	image: {
		type: String,
		required: [true, 'Image is required'],
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		maxLength: [200, 'Description must be at most 200 characters long'],
	},
	price: {
		type: Number,
		required: [true, 'Price is required'],
		min: [0, 'Price can not be negative'],
	},
	bestBidder: {
		type: [mongoose.Types.ObjectId],
		ref: 'User',
	},
	owner: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	isClosed: {
		type: Boolean,
		default: false,
	}
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
