const { getAll } = require('../services/photoService.js');
const { parseError } = require('../util/parser.js');

const homeController = require('express').Router(); 

///////////////////////////////////// HOME /////////////////////////////////////
homeController.get('/', (req, res) => {
	res.render('home', {
		title: 'Home Page',
	});
});

///////////////////////////////////// CATALOG //////////////////////////////
homeController.get('/catalog', async (req, res) => {
	try {
		const photos = await getAll();
		res.render('catalog', {
			title: 'Catalog Page',
			photos,
		});
	} catch (error) {
		res.render('catalog', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

module.exports = homeController;
