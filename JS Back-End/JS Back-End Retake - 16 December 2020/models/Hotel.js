const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		unique: true,
        minLength: [4, 'Hotel name must be at least 4 characters long']
	},
    city: {
		type: String,
		required: [true, 'City is required'],
        minLength: [3, 'City name must be at least 4 characters long']
	},
	imgUrl: {
		type: String,
		required: [true, 'Image URL is required'],
        match: [/^https?:\/\/.+$/g, 'Image URL is not valid']
	},
    rooms: {
        type: Number,
        required: [true, 'Rooms is required'],
        min: [1, 'Rooms must be between 1 and 100'],
        max: [100, 'Rooms must be between 1 and 100'],
    },
    bookings: {
        type: [ mongoose.Types.ObjectId ],
        ref: 'User',
        default: [], 
    },
    owner: {
        type: mongoose.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;