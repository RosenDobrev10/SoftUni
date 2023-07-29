const Play = require('../models/Play.js');

async function getPublicByDate() {
	return Play.find({}).sort({ createdAt: -1 }).where('isPublic').equals(true).lean();
}

async function getRecentPublicByLikes() {
	return Play.find({}).sort({ likes: -1 }).where('isPublic').equals(true).limit(3).lean();
}

async function getByLikes() {
	return Play.find({}).sort({ likes: -1 }).lean();
}

async function getByDate() {
	return Play.find({}).sort({ createdAt: -1 }).lean();
}

async function create(play) {
	return Play.create(play);           
}

async function getById(id) {
	return Play.findById(id).lean();      
}

async function deleteById(id) {
	return Play.findByIdAndDelete(id);
}

async function updateById(id, play) {
	const existing = await Play.findById(id); 

	existing.title = play.title;              
	existing.description = play.description;
	existing.imageUrl = play.imageUrl;
	existing.duration = play.duration;

	return existing.save();                     
}

async function like(courseId, userId) {
	const existing = await Play.findById(courseId);   

	existing.users.push(userId);                       
	existing.likes++;                               

	return existing.save();                             
}

module.exports = {
	getPublicByDate,
	getRecentPublicByLikes,
	getByLikes,
	getByDate,
	create,
	getById,
	deleteById,
	updateById,
	like,
};
