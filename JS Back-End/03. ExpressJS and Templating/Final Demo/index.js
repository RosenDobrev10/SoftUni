const express = require('express');
const hbs = require('express-handlebars');

const homeController = require('./controllers/homeController.js');
const catalogController = require('./controllers/catalogController.js');
const createController = require('./controllers/createController.js');
const deleteController = require('./controllers/deleteController.js');

const app = express();

const handlebars = hbs.create({ extname: '.hbs' });     // Създаваме темплейт енджина и му казваме че разширението на нашите темплейт файлове, ще бъде .hbs})
app.engine('.hbs', handlebars.engine);                  // Казваме на енджина към кое разширение да се върже. РЕГИСТРИРА ЕНДЖИН ТЕМПЛЕЙТА
app.set('view engine', '.hbs');                         // Казваме на разширението да се върже за енджина. РЕГИСТРИРА РАЗШИРЕНИЕТО

app.use(express.urlencoded({ extended: false }));       // Парсва формите и идват като req.body
app.use('/static', express.static('static'));

app.use(homeController);
app.use('/catalog', catalogController);
app.use('/create', createController);
app.use('/delete', deleteController);
app.all('/*', (req, res) => {
	res.render('404');
});

app.listen(3000);
