const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const publicationController = require('../controllers/publicationController.js');

module.exports = (app) => {
	app.use('/', homeController);
	app.use('/auth', authController);
	app.use('/publications', publicationController); 
	app.all('*', (req, res) => {
		res.render('404', {
			title: '404 Not Found'
		});
	});
};
