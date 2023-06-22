const express = require('express');
const hbs = require('express-handlebars').create({
	extname: '.hbs',
});

const homeController = require('./controllers/homeController.js');
const catalogController = require('./controllers/catalogController.js');
const createController = require('./controllers/createController.js');
const defaultController = require('./controllers/defaultController.js');
const defaultTitle = require('./middlewares/defaultTitle.js');

const app = express();

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.use(defaultTitle('SoftUni Accomodation'));

app.use(homeController);
app.use('/catalog', catalogController);
app.use('/create', createController);
// Attach other controllers

app.all("*", defaultController)

app.listen(3000, () => console.log('Server is listening on port 3000'));
