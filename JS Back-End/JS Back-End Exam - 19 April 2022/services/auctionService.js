const Auction = require('../models/Auction.js');

async function getAll() {
	return Auction.find({ isClosed: { $ne: true } }).lean();
}

async function getById(id) {
	return Auction.findById(id).lean();
}

async function getByIdPopulate(id) {
	return Auction.findById(id).populate('owner bestBidder', ['firstName', 'lastName']).lean();
}

async function create(book) {
	return Auction.create(book);
}

async function deleteById(id) {
	return Auction.findByIdAndDelete(id);
}

async function updateById(id, auction) {
	const existing = await Auction.findById(id);

	existing.title = auction.title;
	existing.category = auction.category;
	existing.description = auction.description;
	existing.price = auction.price;
	existing.image = auction.image;

	return existing.save();
}

async function bid(id, newBid, userId) {
	const existing = await Auction.findById(id);

	existing.price = newBid;
	existing.bestBidder.push(userId);

	return existing.save();
}

async function getClosed(userId) {
	return Auction.find({ isClosed: true, owner: userId }).populate('bestBidder', ['firstName', 'lastName']).lean();
}

async function close(id) {
	const existing = await Auction.findById(id);

	existing.isClosed = true;
	
	return existing.save();
}

module.exports = {
	getAll,
	getById,
	getByIdPopulate,
	create,
	deleteById,
	updateById,
	bid,
	getClosed,
	close
};
