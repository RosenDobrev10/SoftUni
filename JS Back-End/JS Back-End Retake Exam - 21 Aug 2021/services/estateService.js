const Estate = require('../models/Estate.js');

async function getAll() {
	return Estate.find({}).lean();
}

async function getLastThree() {
	return Estate.find({}).sort({_id: -1}).limit(3).lean();
}

async function create(estate) {
	return Estate.create(estate);
}

async function getbyId(id) {
	return Estate.findById(id).populate('renters', 'name').lean();
	// return Trip.findById(id).populate('owner buddies', ['email', 'gender']).lean(); // Alternative way of populating two fields
}

async function deletebyId(id) {
	return Estate.findByIdAndDelete(id);
}

async function updatebyId(id, estate) {
	const existing = await Estate.findById(id);

	existing.name = estate.name;
	existing.type = estate.type;
	existing.year = estate.year;
	existing.city = estate.city;
	existing.image = estate.image;
	existing.description = estate.description;
	existing.pieces = estate.pieces;

	return existing.save();
}

async function rent(id, userId) {
	const existing = await Estate.findById(id);

	existing.renters.push(userId);
	existing.pieces--;

	return existing.save();
}

async function search(query) {
	let estates = await getAll();

	if (query){
		estates = estates.filter(e => e.type.toLowerCase() == query.toLowerCase())
	}

	return estates;
	// return Estate.find({ type: { $regex: new RegExp(query, 'i') }}).lean(); // Alternative way for searching with regex in mongoose query
}

module.exports = {
	getAll,
	getLastThree,
	create,
	getbyId,
	deletebyId,
	updatebyId,
	rent,
	search,
};
