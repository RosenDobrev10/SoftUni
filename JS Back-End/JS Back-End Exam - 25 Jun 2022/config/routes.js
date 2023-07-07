const homeController = require("../controllers/homeController.js");
const authController = require("../controllers/authController.js");
const cryptoController = require("../controllers/cryptoController.js");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/crypto', cryptoController);    // Импортирай си контролера за основния ресурс
    app.all('*', (req, res) => {
        res.render('404');
    });
}