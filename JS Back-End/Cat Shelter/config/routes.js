const homeController = require('../controllers/homeController.js');
const catController = require('../controllers/catController.js');

module.exports = (app) => {
	app.use('/', homeController);
	app.use('/cats', catController);
};
