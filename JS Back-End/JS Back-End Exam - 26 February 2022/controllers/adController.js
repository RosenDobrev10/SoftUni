const { hasUser } = require('../middlewares/guards.js');
const { create, getbyId, deletebyId, updatebyId, apply, search} = require('../services/adService.js');
const { parseError } = require('../util/parser.js');

const adController = require('express').Router();

///////////////////////////////////// CREATE //////////////////////////////
adController.get('/create', hasUser(), (req, res) => {

	res.render('create', {
		title: 'Create Page',
	});
});

adController.post('/create', hasUser(), async (req, res) => {

	const ad = {
		headline: req.body.headline,
		location: req.body.location,
		name: req.body.name,
		description: req.body.description,
		owner: req.user._id,
	};

	try {
		await create(ad);
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
adController.get('/:id/details', async (req, res) => {

	try {
		const ad = await getbyId(req.params.id);

		ad.isOwner = ad.owner._id == req.user?._id;
		ad.hasApplied = ad.appliers.some(id => id._id == req.user?._id)

		res.render('details', {
			title: 'Details Page',
			ad,
		});
	} catch (error) {
		res.render('catalog', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// DELETE //////////////////////////////
adController.get('/:id/delete', hasUser(), async (req, res) => {

	try {
	const ad = await getbyId(req.params.id);

	if (ad.owner._id != req.user?._id) {
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
adController.get('/:id/edit', hasUser(), async (req, res) => {

	try {
		const ad = await getbyId(req.params.id);

		if (ad.owner._id != req.user?._id) {
			return res.redirect('/404');
		}

		res.render('edit', {
			title: 'Edit Page',
			ad,
		});
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

adController.post('/:id/edit', hasUser(), async (req, res) => {

	const editedAd = {
		headline: req.body.headline,
		location: req.body.location,
		name: req.body.name,
		description: req.body.description,
	};

	try {
		const ad = await getbyId(req.params.id);
        
		if (ad.owner._id != req.user?._id) {
			return res.redirect('/404');
		}

        await updatebyId(req.params.id, editedAd);
        res.redirect(`/ads/${req.params.id}/details`)
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
			ad: req.body,
		});
	}
});

///////////////////////////////////// APPLY //////////////////////////////
adController.get('/:id/apply', hasUser(), async (req, res) => {

	try {
		const ad = await getbyId(req.params.id);

		if (ad.owner._id != req.user?._id && ad.appliers.some(id => id == req.user?._id) == false){   
			await apply(req.params.id, req.user?._id);
    	}

		res.redirect(`/ads/${req.params.id}/details`);
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// SEARCH //////////////////////////////
adController.get('/search', hasUser(), async (req, res) => {

	try {
		const ads = await search(req.query.search);
		
		res.render('search', {
			title: 'Search Page',
			ads,
			query: req.query.search
		});
	} catch (error) {
		res.render('search', {
			title: 'Search Page',
			errors: parseError(error),
		});
	}
});

module.exports = adController;
