const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
	start: {
		type: String,
		required: [true, 'Starting point is required'],
		minLength: [4, 'Starting point should be a minimum of 4 characters long'],
	},
	end: {
		type: String,
		required: [true, 'End point is required'],
		minLength: [4, 'End point should be a minimum of 4 characters long'],
	},
	date: {
		type: String,
		required: [true, 'Date is required'],
	},
	time: {
		type: String,
		required: [true, 'Time is required'],
	},
	image: {
		type: String,
		required: [true, 'Car Image is required'],
		match: [/^https?:\/\/.+$/, 'The Car Image should be starts with http:// or https://.'],
	},
	brand: {
		type: String,
		required: [true, 'Car brand is required'],
		minLength: [4, 'Car brand should be a minimum of 4 characters long'],
	},
	seats: {
		type: Number,
		required: [true, 'Seats is required'],
		min: [0, 'Minimum value is 0'],
		max: [4, 'Maximum value is 4'],
	},
	price: {
		type: Number,
		required: [true, 'Price is required'],
		min: [1, 'Minimum value is 1'],
		max: [50, 'Maximum value is 50'],
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		minLength: [10, 'Description should be at least of 10 characters long'],
	},
	owner: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	buddies: {
		type: [mongoose.Types.ObjectId],
		ref: 'User',
	},
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
