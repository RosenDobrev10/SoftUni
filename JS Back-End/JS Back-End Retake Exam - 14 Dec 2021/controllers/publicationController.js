const { hasUser } = require('../middlewares/guards.js');
const { create, getbyId, deletebyId, updatebyId, share, myPublications, getSharedPublications} = require('../services/publicationService.js');
const { parseError } = require('../util/parser.js');

const publicationController = require('express').Router();

///////////////////////////////////// CREATE //////////////////////////////
publicationController.get('/create', hasUser(), (req, res) => {
	res.render('create', {
		title: 'Create Page',
	});
});

publicationController.post('/create', hasUser(), async (req, res) => {

	const publication = {
		title: req.body.title,
		technique: req.body.technique,
		picture: req.body.picture,
		certificate: req.body.certificate,
		owner: req.user._id,
	};

	try {
		await create(publication);
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
publicationController.get('/:id/details', async (req, res) => {

	try {
		const publication = await getbyId(req.params.id);

		publication.isOwner = publication.owner._id == req.user?._id;
		publication.hasShared = publication.sharers.some(id => id._id == req.user?._id);

		res.render('details', {
			publication,
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
publicationController.get('/:id/delete', hasUser(), async (req, res) => {

	try {
		const publication = await getbyId(req.params.id);

		if (publication.owner._id != req.user._id) {
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
publicationController.get('/:id/edit', hasUser(), async (req, res) => {

	try {
		const publication = await getbyId(req.params.id);

		if (publication.owner._id != req.user._id) {
			return res.redirect('/404');
		}

		res.render('edit', {
			title: 'Edit Page',
			publication,
		});
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
		});
	}
});

publicationController.post('/:id/edit', hasUser(), async (req, res) => {

	const editedPublication = {
		title: req.body.title,
		technique: req.body.technique,
		picture: req.body.picture,
		certificate: req.body.certificate,
	};

	try {
		const publication = await getbyId(req.params.id);
        
		if (publication.owner._id != req.user._id) {
			return res.redirect('/404');
		}

        await updatebyId(req.params.id, editedPublication);
        res.redirect(`/publications/${req.params.id}/details`)
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
			publication: req.body
		});
	}
});

///////////////////////////////////// SHARE //////////////////////////////
publicationController.get('/:id/share', hasUser(), async (req, res) => {

	try {
		const publication = await getbyId(req.params.id);

		if (publication.owner._id != req.user._id && publication.sharers.some(id => id == req.user._id) == false){   
			await share(req.params.id, req.user._id);
    	}

		res.redirect(`/publications/${req.params.id}/details`);
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// PROFILE //////////////////////////////
publicationController.get('/profile', hasUser(), async (req, res) => {

	try {
		const sharedPublications = (await getSharedPublications(req.user._id)).map(publication => publication.title).join(', ');		
		const createdPublications = (await myPublications(req.user._id)).map(publication => publication.title).join(', ');
				
		res.render('profile', {
			title: 'Profile Page',
			sharedPublications,
			createdPublications
		});
	} catch (error) {
		res.render('profile', {
			title: 'Profile Page',
			errors: parseError(error),
		});
	}
});

module.exports = publicationController;
