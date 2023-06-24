const express = require('express');
const hbs = require('express-handlebars').create({
	extname: '.hbs',
});
const mongoose = require('mongoose');
const homeController = require('./models/controllers/homeController.js');
const articleController = require('./models/controllers/articleController.js');

const connectionString = 'mongodb://127.0.0.1:27017/testdb';

async function start() {
	const app = express();
	app.engine('.hbs', hbs.engine);
	app.set('view engine', '.hbs');

	app.use(express.urlencoded({ extended: true }));

	app.use(homeController);
	app.use('/articles', articleController);

	await mongoose.connect(connectionString, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});
	console.log('Database connected');

	app.listen(3000, () => console.log('Server is listening on port 3000...'));
}

start();
