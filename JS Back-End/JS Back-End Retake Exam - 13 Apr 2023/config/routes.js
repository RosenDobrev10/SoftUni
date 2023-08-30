const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const gameController = require('../controllers/gameController.js');

module.exports = (app) => {
	app.use('/', homeController);
	app.use('/auth', authController);
	app.use('/game', gameController); // Импортирай си контролера за основния ресурс
	app.all('*', (req, res) => {
		res.render('404', {
			title: '404 Not Found'
		});
	});
};
