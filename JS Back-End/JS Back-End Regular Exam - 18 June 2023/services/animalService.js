const Animal = require('../models/Animal.js');

async function getAll() {
	return Animal.find({}).lean();
}

async function getLastThreeAdded() {
	return Animal.find({}).sort({ _id: -1 }).limit(3).lean();
}

async function create(animal) {
	return Animal.create(animal);
}

async function getbyId(id) {
	return Animal.findById(id).lean();
}

async function deleteById(id) {
	return Animal.findByIdAndDelete(id);
}

async function updatebyId(id, animal) {
	const existing = await Animal.findById(id);

	existing.name = animal.name;
	existing.years = animal.years;
	existing.kind = animal.kind;
	existing.image = animal.image;
	existing.need = animal.need;
	existing.location = animal.location;
	existing.description = animal.description;

	return existing.save();
}

async function donate(id, userId) {
	const existing = await Animal.findById(id);

	existing.donations.push(userId);

	return existing.save();
}

async function search(search) {
	let animals = await getAll();

	if (search) {
		animals = animals.filter((animal) => animal.location.toLowerCase().includes(search.toLowerCase()));
	}

	return animals;
}

module.exports = {
	getAll,
	getLastThreeAdded,
	create,
	getbyId,
	deleteById,
	updatebyId,
	donate,
	search,
};
