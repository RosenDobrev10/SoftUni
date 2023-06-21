const express = require('express');
const hbs = require('express-handlebars');

const app = express();
const handlebars = hbs.create({ extname: '.hbs'})   // Създаваме темплейт енджина и му казваме че разширението на нашите темплейт файлове, ще бъде .hbs})
app.engine('.hbs', handlebars.engine);              // Казваме на енджина към кое разширение да се върже. РЕГИСТРИРА ЕНДЖИН ТЕМПЛЕЙТА
app.set('view engine', '.hbs')                      // Казваме на разширението да се върже за енджина. РЕГИСТРИРА РАЗШИРЕНИЕТО 


app.get('/', (req, res) => {
    res.locals.name1 = 'Yordanka';  // Друг начин да бъдат подадени динамични данни на темплейта е чрез res.locals, което е обект
    res.locals.name2 = 'Rosen';     // По този начин в middleware, можем да закачим данни и те да стигнат до темплейта

    res.render('home', {            // render ще потърси в папка views файл с име home.hbs, като за layout ще ползва сложеното в папка layouts и конкретно файл main.hbs и ще го ползва
        title: 'Handlebars Demo',
        username: 'Rosko',
        message: 'Hello there, ',   // Динамичните данни на темплейта се подават като обект със свойства и ще бъдат достъпни
        response: 'Hello here, ',
        contacts: [
            {
                name: 'Peter',
                email: 'peter@abv.bg'
            },
            {
                name: 'John',
                email: 'john@abv.bg'
            },
            {
                name: 'Bob',
                email: 'bob@abv.bg'
            },
        ]
    });               
})

app.listen(3000);