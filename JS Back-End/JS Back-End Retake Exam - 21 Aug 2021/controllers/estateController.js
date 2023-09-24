const { hasUser } = require('../middlewares/guards.js');
const { create, getbyId, deletebyId, updatebyId, rent, search} = require('../services/estateService.js');
const { parseError } = require('../util/parser.js');

const estateController = require('express').Router();

///////////////////////////////////// CREATE //////////////////////////////
estateController.get('/create', hasUser(), (req, res) => {

	res.render('create', {
		title: 'Create Page',
	});
});

estateController.post('/create', hasUser(), async (req, res) => {

	const estate = {
		name: req.body.name,
		type: req.body.type,
		year: req.body.year,
		city: req.body.city,
		image: req.body.image,
		description: req.body.description,
		pieces: Number(req.body.pieces),
		owner: req.user._id,
	};

	try {
		await create(estate);
		res.redirect('/catalog');
	} catch (error) {
		res.render('create', {
			title: 'Create Page',
			errors: parseError(error),
			body: req.body,
		});
	}
});


///////////////////////////////////// DETAILS //////////////////////////////
estateController.get('/:id/details', async (req, res) => {

	try {
		const estate = await getbyId(req.params.id);

		estate.isOwner = estate.owner._id == req.user?._id;
		estate.hasRenters = estate.renters.length > 0;
		estate.hasRent = estate.renters.some(id => id._id == req.user?._id);
		estate.names = estate.renters.map(renter => renter.name).join(", ")
		estate.avalaiblePieces = estate.pieces;
		console.log(estate);

		res.render('details', {
			estate,
			title: 'Details Page',
		});
	} catch (error) {
		res.render('catalog', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// DELETE //////////////////////////////
estateController.get('/:id/delete', hasUser(), async (req, res) => {

	try {
		const estate = await getbyId(req.params.id);

		if (estate.owner._id != req.user._id) {
			return res.redirect('/404');
		}

		await deletebyId(req.params.id);
		res.redirect('/catalog');
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// EDIT //////////////////////////////
estateController.get('/:id/edit', hasUser(), async (req, res) => {

	try {
		const estate = await getbyId(req.params.id);

		if (estate.owner._id != req.user._id) {
			return res.redirect('/404');
		}

		res.render('edit', {
			title: 'Edit Page',
			estate,
		});
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
		});
	}
});

estateController.post('/:id/edit', hasUser(), async (req, res) => {

	const editedEstate = {
		name: req.body.name,
		type: req.body.type,
		year: req.body.year,
		city: req.body.city,
		image: req.body.image,
		description: req.body.description,
		pieces: Number(req.body.pieces),
	};

	try {
		const trip = await getbyId(req.params.id);
        
		if (trip.owner._id != req.user._id) {
			return res.redirect('/404');
		}

        await updatebyId(req.params.id, editedEstate);
        res.redirect(`/estates/${req.params.id}/details`)
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
			estate: req.body
		});
	}
});

///////////////////////////////////// RENT //////////////////////////////
estateController.get('/:id/rent', hasUser(), async (req, res) => {

	try {
		const estate = await getbyId(req.params.id);

		if (estate.owner != req.user._id && estate.renters.some(id => id == req.user._id) == false && estate.pieces > 0){   
			await rent(req.params.id, req.user._id);
    	}

		res.redirect(`/estates/${req.params.id}/details`);
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// PROFILE //////////////////////////////
estateController.get('/search', hasUser(), async (req, res) => {

	try {
		const estates = await search(req.query.search);
		res.render('search', {
			title: 'Search Page',
			estates,
			query: req.query.search
		});
	} catch (error) {
		res.render('search', {
			title: 'Search Page',
			errors: parseError(error),
			query: req.query.search
		});
	}
});

module.exports = estateController;
