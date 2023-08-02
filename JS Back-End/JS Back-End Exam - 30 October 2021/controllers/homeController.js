const { getAll } = require('../services/postService.js');
const { parseError } = require('../util/parser.js');

const homeController = require('express').Router(); // Създаваме си самия контролер

// ДА СЕ СМЕНИ С КОНТРОЛЕРА ОТ ЗАДАНИЕТО

homeController.get('/', async (req, res) => {
	try {
		const publications = await getAll();
		res.render('home', {
			title: 'Home Page',
			publications,
		});
	} catch (error) {
		res.render('home', {
			title: 'Home Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// CATALOG //////////////////////////////
homeController.get('/catalog', async (req, res) => {
	try {
		const posts = await getAll();
		res.render('catalog', {
			title: 'Catalog Page',
			posts,
		});
	} catch (error) {
		res.render('catalog', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

module.exports = homeController;
