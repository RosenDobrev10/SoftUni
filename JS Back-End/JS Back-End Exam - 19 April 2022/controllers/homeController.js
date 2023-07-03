const { getAll } = require('../services/auctionService.js');
const { parseError } = require('../util/parser.js');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
	res.render('home', {
		user: req.user,
		title: 'Home Page'
	});
});

homeController.get('/catalog', async (req, res) => {
	try {
		const auctions = await getAll();
		res.render('catalog', {
			title: 'Catalog Page',
			auctions,
		});
	} catch (error) {
		res.render('catalog', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

module.exports = homeController;
