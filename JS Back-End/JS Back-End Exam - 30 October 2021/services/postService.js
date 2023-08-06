const Post = require('../models/Post.js');

async function getAll() {
	return Post.find({}).lean();
}

async function create(post) {
	return Post.create(post);
}

async function getbyId(id) {
	return Post.findById(id).populate('owner voters').lean();
	return Trip.findById(id).populate('owner buddies', ['email', 'gender']).lean(); // Alternative way of populating two fields
}

async function deletebyId(id) {
	return Post.findByIdAndDelete(id);
}

async function updatebyId(id, post) {
	const existing = await Post.findById(id);

	existing.title = post.title;
	existing.keyword = post.keyword;
	existing.location = post.location;
	existing.date = post.date;
	existing.image = post.image;
	existing.description = post.description;

	return existing.save();
}

async function upvote(id, userId) {
	// return Post.updateOne({_id: id}, {$inc: {ratings: 1}, $push: {voters: userId}})	// THE MONGOOSE WAY 
	const existing = await Post.findById(id);

	existing.voters.push(userId);
	existing.ratings++;

	return existing.save();
}

async function downvote(id, userId) {
	// return Post.updateOne({_id: id}, {$inc: {ratings: -1}, $push: {voters: userId}})	// THE MONGOOSE WAY 
	const existing = await Post.findById(id);

	existing.voters.push(userId);
	existing.ratings--;

	return existing.save();
}

async function vote(id, userId, voteValue) {
	return Post.updateOne({_id: id}, {$inc: {ratings: voteValue}, $push: {voters: userId}})	// THE MONGOOSE WAY 
}

async function myPosts(userId) {
	return Post.find({ owner: userId }).populate('owner').lean();
}

module.exports = {
	getAll,
	create,
	getbyId,
	deletebyId,
	updatebyId,
	upvote,
	downvote,
	vote, 
	myPosts,
};
