const Hotel = require('../models/Hotel.js');

async function getAll() {
	return Hotel.find({}).lean();
}

async function getById(id) {
	return Hotel.findById(id).lean();
}

async function getByUserBooking(userId) {
	return Hotel.find({ bookings: userId }).lean();
}

async function create(hotel) {
	return await Hotel.create(hotel);
}

async function update(id, hotel) {
	const editedHotel = await Hotel.findById(id);

	editedHotel.name = hotel.name;
	editedHotel.city = hotel.city;
	editedHotel.imgUrl = hotel.imgUrl;
	editedHotel.rooms = hotel.rooms;

	return editedHotel.save();
}

async function deleteById(id) {
	return Hotel.findByIdAndDelete(id);
}

async function bookRoom(hotelId, userId) {
	const hotel = await Hotel.findById(hotelId);

	hotel.bookings.push(userId);
	
	return hotel.save();
}

module.exports = {
	getAll,
	getById,
    getByUserBooking,
	create,
	update,
	deleteById,
	bookRoom,
};
