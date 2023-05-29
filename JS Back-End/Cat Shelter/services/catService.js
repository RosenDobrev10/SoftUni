const Cat = require('../models/Cat.js');

async function getAll(search) {
	const query = {};
	if (search) {
		query.name = new RegExp(search, 'i');
	}
	return Cat.find(query).lean();
}

async function createCat(cat) {
	return Cat.create(cat);
}

async function getById(id) {
	return Cat.findById(id).lean();
}

async function deleteById(id) {
	return Cat.findByIdAndDelete(id);
}

async function updateById(id, cat) {
	const existing = await Cat.findById(id);

	existing.name = cat.name;
	existing.description = cat.description;
	existing.imageUrl = cat.imageUrl;
	existing.breed = cat.breed;

	return existing.save();
}

module.exports = {
	getAll,
	createCat,
	getById,
	deleteById,
	updateById,
};
