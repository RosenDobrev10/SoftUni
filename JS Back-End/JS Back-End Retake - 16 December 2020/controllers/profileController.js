const { hasUser } = require('../middlewares/guards.js');
const { getByUserBooking } = require('../services/hotelService.js');

const profileController = require('express').Router();

profileController.get('/', hasUser(), async (req, res) => {

	let bookings = await getByUserBooking(req.user._id);
	bookings = bookings.map(b => b.name).join(', ')

	res.render('profile', {
		// user: Object.assign({ bookings }, req.user),
		bookings
	});
});

module.exports = profileController;
