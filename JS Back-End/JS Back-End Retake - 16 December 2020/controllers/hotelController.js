const { create, getById, update, deleteById, bookRoom } = require('../services/hotelService.js');
const { parseError } = require('../util/parser.js');

const hotelController = require('express').Router();

/////////////////////////////// DETAILS ///////////////////////////////////////
hotelController.get('/:id/details', async (req, res) => {
	try {
		const hotel = await getById(req.params.id);

		if (hotel.owner == req.user._id) {
			hotel.isOwner = true;
		} else if (hotel.bookings.map(booking => booking.toString()).includes(req.user._id.toString())) {
			hotel.isBooked = true;
		}

		res.render('details', {
			title: 'Details Page',
			hotel,
		});
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
	
});

/////////////////////////////// CREATE ///////////////////////////////////////
hotelController.get('/create', (req, res) => {
	res.render('create', {
		title: 'Create Page'
	});
});

hotelController.post('/create', async (req, res) => {

	const hotel = {
		name: req.body.name,
		city: req.body.city,
		imgUrl: req.body.imgUrl,
		rooms: Number(req.body.rooms),
		owner: req.user._id,
	};

	try {
		if (Object.values(hotel).some((value) => !value)) {
			throw new Error('All fields are required');
		}

		await create(hotel);
		res.redirect('/');
	} catch (error) {
		res.render('create', {
			title: 'Create Page',
			errors: parseError(error),
			body: req.body
		});
	}
});

/////////////////////////////// EDIT ///////////////////////////////////////
hotelController.get('/:id/edit', async (req, res) => {
	try {
		const hotel = await getById(req.params.id);

		if (hotel.owner != req.user._id) {
			return res.redirect('/auth/login');
		}

		res.render('edit', {
			hotel,
		});
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
	
});

hotelController.post('/:id/edit', async (req, res) => {
	const editedHotel = {
		name: req.body.name,
		city: req.body.city,
		imgUrl: req.body.imgUrl,
		rooms: Number(req.body.rooms),
	};

	try {
		const hotel = await getById(req.params.id);

		if (hotel.owner != req.user._id) {
			return res.redirect('/auth/login');
		}

		if (Object.values(editedHotel).some((value) => !value)) {
			throw new Error('All fields are required');
		}

		await update(req.params.id, editedHotel);
		res.redirect(`/hotel/${req.params.id}/details`);
	} catch (error) {
		res.render('edit', {
			hotel: Object.assign(editedHotel, { _id: req.params.id }),
			errors: parseError(error),
			// hotel: req.body
		});
	}
});

/////////////////////////////// DELETE ///////////////////////////////////////
hotelController.get('/:id/delete', async (req, res) => {

	try {
		const hotel = await getById(req.params.id);

		if (hotel.owner != req.user._id) {
			return res.redirect('/auth/login');
		}

		await deleteById(req.params.id);
		res.redirect('/');
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
	
});

/////////////////////////////// BOOK ///////////////////////////////////////
hotelController.get('/:id/book', async (req, res) => {
	
	try {
		const hotel = await getById(req.params.id);

		if (hotel.owner == req.user._id) {
            hotel.isOwner = true;
			throw new Error('Cannot book your own hotel');
		}

        if (hotel.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
            hotel.isBooked = true;
            throw new Error('Cannot book twice');
        }

		await bookRoom(req.params.id, req.user._id);
		res.redirect(`/hotel/${req.params.id}/details`);
	} catch(error){
        res.render('details', {
            hotel,
            errors: parseError(error)
        });
    }
});

module.exports = hotelController;
