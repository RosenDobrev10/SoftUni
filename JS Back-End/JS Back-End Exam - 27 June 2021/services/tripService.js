const Trip = require('../models/Trip.js');

async function getAll() {
	return Trip.find({}).lean();
}

async function create(ad) {
	return Trip.create(ad);
}

async function getbyId(id) {
	return Trip.findById(id).populate('owner', 'email').populate('buddies', 'email').lean();
	// return Trip.findById(id).populate('owner buddies', ['email', 'gender']).lean(); // Alternative way of populating two fields
}

async function deletebyId(id) {
	return Trip.findByIdAndDelete(id);
}

async function updatebyId(id, trip) {
	const existing = await Trip.findById(id);

	existing.start = trip.start;
	existing.end = trip.end;
	existing.date = trip.date;
	existing.time = trip.time;
	existing.image = trip.image;
	existing.brand = trip.brand;
	existing.seats = trip.seats;
	existing.price = trip.price;
	existing.description = trip.description;

	return existing.save();
}

async function join(id, userId) {
	const existing = await Trip.findById(id);

	existing.buddies.push(userId);
	existing.seats--;

	return existing.save();
}

async function myTrips(userId) {
	return Trip.find({ owner: userId }).lean();
}

module.exports = {
	getAll,
	create,
	getbyId,
	deletebyId,
	updatebyId,
	join,
	myTrips,
};
