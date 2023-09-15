const authController = require('../controllers/authController.js');
const bookController = require('../controllers/bookController.js');
const homeController = require('../controllers/homeController.js');

module.exports = (app) => {
	app.use('/', homeController);
	app.use('/auth', authController);
	app.use('/books', bookController);
	app.all('*', (req, res) => res.render('404', { title: '404 Not Found' }));
};
