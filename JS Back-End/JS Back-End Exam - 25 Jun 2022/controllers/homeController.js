const homeController = require('express').Router(); // Създаваме си самия контролер

homeController.get('/', (req, res) => {
	res.render('home');
});

module.exports = homeController;
