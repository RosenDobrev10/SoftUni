const Game = require('../models/Game.js');

async function getAll() {
	return Game.find({}).lean();
}

async function create(game) {
	return Game.create(game);
}

async function getbyId(id) {
	return Game.findById(id).lean();
}

async function deleteById(id) {
	return Game.findByIdAndDelete(id);
}

async function updatebyId(id, game) {
	const existing = await Game.findById(id);

	existing.name = game.name;
	existing.price = game.price;
	existing.imageUrl = game.imageUrl;
	existing.description = game.description;
	existing.platform = game.platform;
	existing.genre = game.genre;

	return existing.save();
}

async function buy(gameId, userId) {
	const existing = await Game.findById(gameId);

	existing.buyers.push(userId);

	return existing.save();
}

async function search(nameSearch, platformSearch) {
	let games = await getAll();

	if (nameSearch) {
		games = games.filter(game => game.name.toLowerCase().includes(nameSearch.toLowerCase()));
	}

	if (platformSearch) {
		games = games.filter(game => game.platform.toLowerCase() == platformSearch.toLowerCase());
	}

	return games;
}

module.exports = {
	getAll,
	create,
	getbyId,
	deleteById,
	updatebyId,
	buy,
	search,
};
