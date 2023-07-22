const { getAll } = require('../services/tripService.js');
const { parseError } = require('../util/parser.js');

const homeController = require('express').Router(); // Създаваме си самия контролер

// ДА СЕ СМЕНИ С КОНТРОЛЕРА ОТ ЗАДАНИЕТО

homeController.get('/', (req, res) => {
	res.render('home', {
		title: 'Home Page',
	});
});

///////////////////////////////////// CATALOG //////////////////////////////
homeController.get('/catalog', async (req, res) => {
	try {
		const trips = await getAll();
		res.render('catalog', {
			title: 'Catalog Page',
			trips,
		});
	} catch (error) {
		res.render('catalog', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

module.exports = homeController;
