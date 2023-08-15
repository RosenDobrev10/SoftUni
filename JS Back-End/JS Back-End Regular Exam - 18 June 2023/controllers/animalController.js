const { hasUser } = require('../middlewares/guards.js');
const { create, getbyId, deleteById, updatebyId, donate,} = require('../services/animalService.js');
const { parseError } = require('../util/parser.js');

const gameController = require('express').Router();

///////////////////////////////////// CREATE //////////////////////////////
gameController.get('/create', hasUser(), (req, res) => {
	res.render('create', {
		title: 'Create Page'
	});
});

gameController.post('/create', hasUser(), async (req, res) => {
	const animal = {
		name: req.body.name,
		years: Number(req.body.years),
		kind: req.body.kind,
		image: req.body.image,
		need: req.body.need,
		location: req.body.location,
		description: req.body.description,
		owner: req.user._id,
	};

	try {
		await create(animal);
		res.redirect('/catalog');
	} catch (error) {
		res.render('create', {
			title: 'Create Page',
			errors: parseError(error),
			body: req.body
		});
	}
});


///////////////////////////////////// DETAILS //////////////////////////////
gameController.get('/:id/details', async (req, res) => {
	try {
		const animal = await getbyId(req.params.id);

		animal.isOwner = animal.owner == req.user?._id;
		animal.hasDonated = animal.donations.some(userId => userId == req.user?._id);

		res.render('details', {
			title: 'Details Page',
			animal,
		});
	} catch (error) {
		res.render('catalog', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// DELETE //////////////////////////////
gameController.get('/:id/delete', hasUser(), async (req, res) => {
	try {
		const animal = await getbyId(req.params.id);

		if (animal.owner != req.user._id) {
			return res.redirect('/404');
		}

		await deleteById(req.params.id);
		res.redirect('/catalog');
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// EDIT //////////////////////////////
gameController.get('/:id/edit', hasUser(), async (req, res) => {
	try {
		const animal = await getbyId(req.params.id);

		if (animal.owner != req.user._id) {
			return res.redirect('/404');
		}

		res.render('edit', {
			title: 'Edit Page',
			animal,
		});
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

gameController.post('/:id/edit', hasUser(), async (req, res) => {
	const editedAnimal = {
		name: req.body.name,
		years: Number(req.body.years),
		kind: req.body.kind,
		image: req.body.image,
		need: req.body.need,
		location: req.body.location,
		description: req.body.description,
	};

	try {
		const animal = await getbyId(req.params.id);
        
		if (animal.owner != req.user._id) {
			return res.redirect('/404');
		}

        await updatebyId(req.params.id, editedAnimal);
        res.redirect(`/animals/${req.params.id}/details`)
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
			animal: req.body
		});
	}
});

///////////////////////////////////// DONATE //////////////////////////////
gameController.get('/:id/donate', hasUser(), async (req, res) => {
	try {
		const animal = await getbyId(req.params.id);

		if (animal.owner != req.user._id && animal.donations.some(userId => userId == req.user._id) == false){   
			await donate(req.params.id, req.user._id);
			res.redirect(`/animals/${req.params.id}/details`);
    	}

	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

module.exports = gameController;
