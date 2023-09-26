const { getAll, getLastThree } = require('../services/estateService.js');
const { parseError } = require('../util/parser.js');

const homeController = require('express').Router(); // Създаваме си самия контролер


homeController.get('/', async (req, res) => {
	try {
		const estates = await getLastThree()
		res.render('home', {
			title: 'Home Page',
			estates
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
		const estates = await getAll();
		res.render('catalog', {
			title: 'Catalog Page',
			estates,
		});
	} catch (error) {
		res.render('catalog', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

module.exports = homeController;
