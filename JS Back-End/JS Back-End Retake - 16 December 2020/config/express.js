const express = require('express');
const hbs = require('express-handlebars');

const cookieParser = require('cookie-parser');
const session = require('../middlewares/session.js');
const trimBody = require('../middlewares/trimBody.js');

module.exports = (app) => {
	app.engine('hbs', hbs.engine({ extname: 'hbs' }));
	app.set('view engine', 'hbs');

	app.use('/static', express.static('static'));
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use(session());
	app.use(trimBody());
};
