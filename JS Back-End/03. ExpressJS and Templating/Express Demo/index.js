const express = require('express'); // Дърпаме express от инсталираната библиотека
const catalogController = require('./catalogController.js');    // Импортираме създадения от нас catalogController

const app = express();              // Създаваме апп като изпълним променливата express. app e инстанция на express

app.use(express.static('static'));  // По този начин се подават статичните файлове от папката static

app.get('/', (req, res) => {        // Приложението ще реагира на get метод на път '/' с callback(handler) функцията, която сме подали(винаги получава request и response ОБЕКТИ )
    res.send('Hello there');        // response изпраща като отговор стринга Hello there. Функцията send, комбинира write и end и не можем да ползваме send повече от веднъж
});

app.get('/home', (req, res) => {
    console.log(__dirname + '/index.html');   // C:\Users\user\Desktop\JS Back-End\03. ExpressJS and Templating/index.html. __dirname дава пътя до папката, в която се намира index.js
    res.sendFile(__dirname + '/index.html');  // sendFile приема абсолютен път до файла, който трябва да покаже 
});

app.get('/download', (req, res) => {
    res.download(__dirname + '/dog.jpg')    // Може да накараме браузъра да попита юзъра дали иска да свали приложения от сървъра файл, като слага header Content-Disposition: attachment; filename="dog.jpg"
});

app.post('/create', (req, res) => {
    res.redirect('/catalog');       // Може да пренасочваме чрез redirect към друга страница, като вътрешно се подава status за redirect и се подава 'Location' header къде да ни пренасочи
});

app.use((req, res, next) => {                           // Ако Middleware се подаде, без path ще се изпълни винаги при всеки възможен request(става глобален за приложението)
    console.log('Middleware for entire application');
    next();
});




app.use('/catalog', (req, res, next) => {   // На app му казваме да използва(use) catalogController за всеки път, който почва с /catalog като в самия контролер подава само пътя СЛЕД ТОВА
    console.log('Middleware for catalog '); // Middleware изпълнява нещо, аутентикира юзър и ни казва дали има достъп до контролера(Guards), дали е owner и т.н.
    next();                                 // ЗАДЪЛЖИТЕЛНО викаме next(), за да може да достигнем до контролера. АКО юзъра не трябва да стига до контролера просто не викаме next(), а редиректваме към друга страница
} , catalogController);          




app.get('/data', (req, res) => {
    res.json([                                  // Сървъра ни може да връща чрез метода json, като се подава ОБЕКТ, който автоматично се stringify
        {
            name: 'Rosen',
            age:33
        },
        {
            name: 'Yordanka',
            age:32
        }
    ]);
});

app.all('*', (req, res) => {                // Звездичката(wildcard) означава, че ще хване всички възможни пътища, a all ще хване всички възможни методи 
    res.status(404).send('404 Not Found');  // Може да изпращаме и статус на заявката, като посочим номера
});                                         // ТОВА ТРЯБВА ДА Е ВИНАГИ ПОСЛЕДНО, ЗАЩОТО АКО Е ПЪРВО НЯМА ДА ИЗПЪЛНЯВА ОСТАНАЛИТЕ ПОСОЧЕНИ ОТ НАС ПЪТИЩА
// ВИНАГИ СЕ ИЗПЪЛНЯВА ПЪРВИЯ МЕТОД И ПЪТ, КОИТО СЪВПАДАТ КАТО ЗАПОЧНЕ ОТГОРЕ-НАДОЛУ

app.listen(3000);                   // Настройваме приложение да работи на порт 3000