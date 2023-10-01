const Photo = require('../models/Photo.js');
const User = require('../models/User.js');

async function getAll() {
	return Photo.find({}).populate('owner').lean();
}

async function create(photo) {
	return Photo.create(photo);
}

async function getbyId(id) {
	return Photo.findById(id).populate('owner').populate('commentList.userId').lean();
	// return Trip.findById(id).populate('owner buddies', ['email', 'gender']).lean(); // Alternative way of populating two fields
}

async function deletebyId(id) {
	return Photo.findByIdAndDelete(id);
}

async function updatebyId(id, photo) {
	const existing = await Photo.findById(id);

	existing.name = photo.name;
	existing.image = photo.image;
	existing.age = photo.age;
	existing.description = photo.description;
	existing.location = photo.location;

	return existing.save();
}

async function comment(id, commentData) {
	const existing = await Photo.findById(id);

	existing.commentList.push(commentData);

	return existing.save();
}

async function myPhotos(userId) {
	return Photo.find({ owner: userId }).lean();
}

async function getUserInfo(id){
	return User.findById(id).lean();
}

module.exports = {
	getAll,
	create,
	getbyId,
	deletebyId,
	updatebyId,
	comment,
	myPhotos,
	getUserInfo
};
