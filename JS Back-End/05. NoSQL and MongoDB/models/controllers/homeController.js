const homeController = require('express').Router();

homeController.get('/', (req, res) => {
	res.render('home');
});

module.exports = homeController;
