const { getPublicByDate, getRecentPublicByLikes } = require('../services/playService.js');
const { parseError } = require('../util/parser.js');

const homeController = require('express').Router(); 

homeController.get('/', async (req, res) => {
	let plays = [];

	if (req.user) {
		try {
			plays = await getPublicByDate();

			res.render('user-home', {
				title: 'User-Home Page',
				plays,
			});
		} catch (error) {
			res.render('user-home', {
				title: 'User-Home Page',
				errors: parseError(error),
			});
		}
		
	} else {
		try {
			plays = await getRecentPublicByLikes();

			res.render('guest-home', {
				title: 'Guest-Home Page',
				plays,
			});
		} catch (error) {
			res.render('guest-home', {
				title: 'Guest-Home Page',
				errors: parseError(error),
			});
		}
	}

});

module.exports = homeController;
