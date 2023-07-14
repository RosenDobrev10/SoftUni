const { getAll, getFirstThree } = require('../services/adService.js');
const { parseError } = require('../util/parser.js');

const homeController = require('express').Router(); // Създаваме си самия контролер

// ДА СЕ СМЕНИ С КОНТРОЛЕРА ОТ ЗАДАНИЕТО

homeController.get('/', async (req, res) => {
	try {
		const ads = await getFirstThree();
		res.render('home', {
		title: 'Home Page',
		ads,
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
		const ads = await getAll();
		res.render('catalog', {
			title: 'Catalog Page',
			ads,
		});
	} catch (error) {
		res.render('404', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

module.exports = homeController;
