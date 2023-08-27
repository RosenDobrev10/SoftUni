const { getAll } = require('../services/hotelService.js');
const { parseError } = require('../util/parser.js');

const homeController = require('express').Router(); // Създаваме си самия контролер

// ДА СЕ СМЕНИ С КОНТРОЛЕРА ОТ ЗАДАНИЕТО

homeController.get('/', async (req, res) => {
	try {
		const hotels = await getAll();
		res.render('home', {
			title: 'Home Page',
			hotels
		});
	} catch (error) {
		res.render('home', {
			title: 'Home Page',
            errors: parseError(error),
        });
	}
	
});

module.exports = homeController;
