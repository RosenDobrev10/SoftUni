const { hasUser } = require('../middlewares/guards.js');
const { create, getbyId, deletebyId, updatebyId, join, myTrips} = require('../services/tripService.js');
const { parseError } = require('../util/parser.js');

const tripController = require('express').Router();

///////////////////////////////////// CREATE //////////////////////////////
tripController.get('/create', hasUser(), (req, res) => {

	res.render('create', {
		title: 'Create Page',
	});
});

tripController.post('/create', hasUser(), async (req, res) => {

	const trip = {
		start: req.body.start,
		end: req.body.end,
		date: req.body.date,
		time: req.body.time,
		image: req.body.image,
		brand: req.body.brand,
		seats: Number(req.body.seats),
		price: Number(req.body.price),
		description: req.body.description,
		owner: req.user._id,
	};

	try {
		await create(trip);
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
tripController.get('/:id/details', async (req, res) => {

	try {
		const trip = await getbyId(req.params.id);

		trip.isOwner = trip.owner._id == req.user?._id;
		trip.hasJoined = trip.buddies.some(id => id._id == req.user?._id);
		trip.buddiesList = trip.buddies.map(buddy => buddy.email).join(", ")
		trip.availableSeats = trip.seats;

		res.render('details', {
			trip,
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
tripController.get('/:id/delete', hasUser(), async (req, res) => {

	try {
		const trip = await getbyId(req.params.id);

		if (trip.owner._id != req.user._id) {
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
tripController.get('/:id/edit', hasUser(), async (req, res) => {

	try {
		const trip = await getbyId(req.params.id);

		if (trip.owner._id != req.user._id) {
			return res.redirect('/404');
		}

		res.render('edit', {
			title: 'Edit Page',
			trip,
		});
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
		});
	}
});

tripController.post('/:id/edit', hasUser(), async (req, res) => {

	const editedTrip = {
		start: req.body.start,
		end: req.body.end,
		date: req.body.date,
		time: req.body.time,
		image: req.body.image,
		brand: req.body.brand,
		seats: Number(req.body.seats),
		price: Number(req.body.price),
		description: req.body.description,
	};

	try {
		const trip = await getbyId(req.params.id);
        
		if (trip.owner._id != req.user._id) {
			return res.redirect('/404');
		}

        await updatebyId(req.params.id, editedTrip);
        res.redirect(`/trips/${req.params.id}/details`)
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
			trip: req.body
		});
	}
});

///////////////////////////////////// JOIN //////////////////////////////
tripController.get('/:id/join', hasUser(), async (req, res) => {

	try {
		const trip = await getbyId(req.params.id);

		if (trip.owner._id != req.user._id && trip.buddies.some(id => id == req.user._id) == false && trip.seats > 0){   
			await join(req.params.id, req.user._id);
    	}

		res.redirect(`/trips/${req.params.id}/details`);
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// PROFILE //////////////////////////////
tripController.get('/profile', hasUser(), async (req, res) => {

	try {
		const trips = await myTrips(req.user._id);		
		res.render('profile', {
			title: 'Profile Page',
			trips,
		});
	} catch (error) {
		res.render('profile', {
			title: 'Profile Page',
			errors: parseError(error),
		});
	}
});

module.exports = tripController;
