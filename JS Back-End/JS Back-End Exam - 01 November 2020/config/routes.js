const homeController = require("../controllers/homeController.js");
const authController = require("../controllers/authController.js");
const courseController = require("../controllers/courseController.js");

const { hasUser } = require("../middlewares/guards.js");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/course', hasUser(), courseController);
}
