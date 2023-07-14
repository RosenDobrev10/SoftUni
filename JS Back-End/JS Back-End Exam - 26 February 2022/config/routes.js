const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const adController = require('../controllers/adController.js');

module.exports = (app) => {
	app.use('/', homeController);
	app.use('/auth', authController);
	app.use('/ads', adController); 
	app.all('*', (req, res) => {
		res.render('404');
	});
};
