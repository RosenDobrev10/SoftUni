const homeController = require('express').Router(); // Създаваме си самия контролер

// ДА СЕ СМЕНИ С КОНТРОЛЕРА ОТ ЗАДАНИЕТО

homeController.get('/', (req, res) => {
	res.render('home', {
        title: 'Home Page'
	});
});

module.exports = homeController;
