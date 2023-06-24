const { getAllArticles, createArticle, } = require('../../services/articleService.js');

const articleController = require('express').Router();

articleController.get('/', async (req, res) => {
	const articles = await getAllArticles();
	res.render('articles', {
		title: '- Articles',
		articles,
	});
});

articleController.post('/', async (req, res) => {
	await createArticle(req.body.author, req.body.title, req.body.content);
	res.redirect('/articles');
});

module.exports = articleController;
