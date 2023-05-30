const { getAll } = require('../services/catService.js');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
	const cats = await getAll(req.query.search);
	res.render('home', { cats });
});

module.exports = homeController;
