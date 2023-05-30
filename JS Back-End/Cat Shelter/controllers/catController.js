const { deleteById, getById, createCat, updateById } = require('../services/catService.js');

const catController = require('express').Router();

catController.get('/create', (req, res) => {
	res.render('create');
});

catController.post('/create', async (req, res) => {
	const cat = {
		name: req.body.name,
		description: req.body.description,
		imageUrl: req.body.imageUrl,
		breed: req.body.breed,
	};

	await createCat(cat);
	res.redirect('/');
});

catController.get('/:id', async (req, res) => {
	const cat = await getById(req.params.id);
	res.render('details', { cat });
});

catController.get('/:id/delete', async (req, res) => {
	await deleteById(req.params.id);
	res.redirect('/');
});

catController.get('/:id/edit', async (req, res) => {
	const cat = await getById(req.params.id);
	res.render('edit', { cat });
});

catController.post('/:id/edit', async (req, res) => {
	await updateById(req.params.id, req.body);
	res.redirect('/');
});

module.exports = catController;
