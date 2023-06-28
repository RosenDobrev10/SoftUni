const { getAllByDate, getRecent } = require('../services/courseService.js');
const { parseError } = require('../util/parser.js');

const homeController = require('express').Router(); // Създаваме си самия контролер

// ДА СЕ СМЕНИ С КОНТРОЛЕРА ОТ ЗАДАНИЕТО

homeController.get('/', async (req, res) => {
	let courses = [];

	if (req.user) {
		try {
			courses = await getAllByDate(req.query.search);

			res.render('user-home', {
				title: 'Home Page',
				courses,
				search: req.query.search
			});
		} catch (error) {
			res.render('user-home', {
				title: 'Home Page',
				errors: parseError(error),
			});
		}
		
	} else {
		try {
			courses = await getRecent();

			res.render('guest-home', {
				title: 'Home Page',
				courses,
			});
		} catch (error) {
			res.render('guest-home', {
				title: 'Home Page',
				errors: parseError(error),
			});
		}
	}
});

module.exports = homeController;
