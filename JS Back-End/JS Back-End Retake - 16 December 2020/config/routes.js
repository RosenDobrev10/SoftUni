const homeController = require("../controllers/homeController.js");
const authController = require("../controllers/authController.js");
const hotelController = require("../controllers/hotelController.js");
const profileController = require("../controllers/profileController.js");

const { hasUser } = require("../middlewares/guards.js");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/hotel', hasUser(), hotelController);
    app.use('/profile', hasUser(), profileController);
}