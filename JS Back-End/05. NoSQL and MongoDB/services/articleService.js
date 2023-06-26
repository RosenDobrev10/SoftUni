const Article = require('../models/Article.js');

async function getAllArticles() {
	const data = await Article.find({}).lean();
	return data;
}

async function createArticle(author, title, content) {
	await Article.create({ author, title, content });
}
module.exports = {
	getAllArticles,
	createArticle,
};
