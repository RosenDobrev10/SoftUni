const Publication = require('../models/Publication.js');

async function getAll() {
	return Publication.find({}).lean();
}

async function create(publication) {
	return Publication.create(publication);
}

async function getbyId(id) {
	return Publication.findById(id).populate('owner', 'username').lean();
	// return Trip.findById(id).populate('owner buddies', ['email', 'gender']).lean(); // Alternative way of populating two fields
}

async function deletebyId(id) {
	return Publication.findByIdAndDelete(id);
}

async function updatebyId(id, publication) {
	const existing = await Publication.findById(id);

	existing.title = publication.title;
	existing.technique = publication.technique;
	existing.picture = publication.picture;
	existing.certificate = publication.certificate;

	return existing.save();
}

async function share(id, userId) {
	const existing = await Publication.findById(id);

	existing.sharers.push(userId);

	return existing.save();
}

async function myPublications(userId) {
	return Publication.find({ owner: userId }).lean();
}

async function getSharedPublications(userId) {
	return Publication.find({ sharers: { $in: userId } }).lean();
}

module.exports = {
	getAll,
	create,
	getbyId,
	deletebyId,
	updatebyId,
	share,
	myPublications,
	getSharedPublications,
};
