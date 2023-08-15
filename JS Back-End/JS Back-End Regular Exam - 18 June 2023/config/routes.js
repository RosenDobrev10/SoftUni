const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const animalController = require('../controllers/animalController.js');

module.exports = (app) => {
	app.use('/', homeController);
	app.use('/auth', authController);
	app.use('/animals', animalController); 
	app.all('*', (req, res) => {
		res.render('404', {
			title: '404 Not Found'
		});
	});
};
