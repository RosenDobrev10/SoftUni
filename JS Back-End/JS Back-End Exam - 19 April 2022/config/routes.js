const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const auctionController = require('../controllers/auctionController.js');

module.exports = (app) => {
	app.use('/', homeController);
	app.use('/auth', authController);
	app.use('/auctions', auctionController);
	app.all('*', (req, res) => res.render('404', { title: '404 Not Found' }));
};
