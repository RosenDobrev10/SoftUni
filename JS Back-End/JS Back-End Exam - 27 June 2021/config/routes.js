const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const tripController = require('../controllers/tripController.js');

module.exports = (app) => {
	app.use('/', homeController);
	app.use('/auth', authController);
	app.use('/trips', tripController); 
	app.all('*', (req, res) => {
		res.render('404');
	});
};
