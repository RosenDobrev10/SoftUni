const { getLastThreeAdded, getAll, search } = require('../services/animalService.js');
const { parseError } = require('../util/parser.js');

const homeController = require('express').Router(); 

///////////////////////////////////// HOME //////////////////////////////
homeController.get('/', async (req, res) => {
	const animals = await getLastThreeAdded()
	res.render('home', {
        title: 'Home Page',
		animals,
	});
});

///////////////////////////////////// CATALOG //////////////////////////////
homeController.get('/catalog', async (req, res) => {
	try {
		const animals = await getAll();
		res.render('catalog', {
			title: 'Catalog Page',
			animals,
		});
	} catch (error) {
		res.render('catalog', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// SEARCH //////////////////////////////
homeController.get('/search', async (req, res) => {
	try {
		const animals = await search(req.query.search);
		res.render('search', {
			title: 'Search Page',
			animals,
			search: req.query.search,
		});
	} catch (error) {
		res.render('search', {
			title: 'Search Page',
			errors: parseError(error),
			search: req.query.search,
		});
	}
});

module.exports = homeController;
