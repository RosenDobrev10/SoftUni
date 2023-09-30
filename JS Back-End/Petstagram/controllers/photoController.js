const { hasUser } = require('../middlewares/guards.js');
const { create, getbyId, deletebyId, updatebyId, myPhotos, comment, getUserInfo} = require('../services/photoService.js');
const { parseError } = require('../util/parser.js');

const photoController = require('express').Router();

///////////////////////////////////// CREATE //////////////////////////////
photoController.get('/create', hasUser(), (req, res) => {

	res.render('create', {
		title: 'Create Page',
	});
});

photoController.post('/create', hasUser(), async (req, res) => {

	const photo = {
		name: req.body.name,
		image: req.body.image,
		age: Number(req.body.age),
		description: req.body.description,
		location: req.body.location,
		owner: req.user._id,
	};

	try {
		await create(photo);
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
photoController.get('/:id/details', async (req, res) => {

	try {
		const photo = await getbyId(req.params.id);

		photo.isOwner = photo.owner._id == req.user?._id;

		res.render('details', {
			photo,
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
photoController.get('/:id/delete', hasUser(), async (req, res) => {

	try {
		const photo = await getbyId(req.params.id);

		if (photo.owner._id != req.user._id) {
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
photoController.get('/:id/edit', hasUser(), async (req, res) => {

	try {
		const photo = await getbyId(req.params.id);

		if (photo.owner._id != req.user._id) {
			return res.redirect('/404');
		}

		res.render('edit', {
			title: 'Edit Page',
			photo,
		});
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
		});
	}
});

photoController.post('/:id/edit', hasUser(), async (req, res) => {

	const editedPhoto = {
		name: req.body.name,
		image: req.body.image,
		age: Number(req.body.age),
		description: req.body.description,
		location: req.body.location,
	};

	try {
		const photo = await getbyId(req.params.id);
        
		if (photo.owner._id != req.user._id) {
			return res.redirect('/404');
		}

        await updatebyId(req.params.id, editedPhoto);
        res.redirect(`/photos/${req.params.id}/details`);
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
			trip: req.body
		});
	}
});

///////////////////////////////////// COMMENT //////////////////////////////
photoController.post('/:id/details', async (req, res) => {
	try {
		await comment(req.params.id, {userId:req.user._id, comment: req.body.comment});
		res.redirect(`/photos/${req.params.id}/details`);
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// MY PROFILE //////////////////////////////
photoController.get('/profile', hasUser(), async (req, res) => {

	try {
		const userInfo = await getUserInfo(req.user._id);
		const photos = await myPhotos(req.user._id);
		console.log(userInfo)	
		res.render('profile', {
			title: 'Profile Page',
			photos,
			userInfo,
		});
	} catch (error) {
		res.render('profile', {
			title: 'Profile Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// OTHER USER PROFILE //////////////////////////////
photoController.get('/profile/:id', hasUser(), async (req, res) => {

	try {
		const userInfo = await getUserInfo(req.params.id);
		const photos = await myPhotos(req.params.id);
		res.render('profile', {
			title: 'Profile Page',
			photos,
			userInfo,
		});
	} catch (error) {
		res.render('profile', {
			title: 'Profile Page',
			errors: parseError(error),
		});
	}
});

module.exports = photoController;
