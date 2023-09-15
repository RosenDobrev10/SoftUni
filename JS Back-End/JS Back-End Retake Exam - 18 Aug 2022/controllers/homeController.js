const { getAll } = require('../services/bookService.js');
const { parseError } = require('../util/parser.js');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
	res.render('home', {
		title: 'Home Page'
	});
});

homeController.get('/catalog', async (req, res) => {
	try {
		const books = await getAll();
		res.render('catalog', {
			title: 'Catalog Page',
			books,
		});
	} catch (error) {
		res.render('catalog', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

module.exports = homeController;
