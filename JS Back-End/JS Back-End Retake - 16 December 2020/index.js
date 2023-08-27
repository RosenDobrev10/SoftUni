const express = require('express'); // Инициализираме експрес

const expressConfig = require('./config/express.js');
const databaseConfig = require('./config/database.js');
const routesConfig = require('./config/routes.js');

async function start() {            // Създаваме функция, която ще стартира всички настройки на нашето приложение
	const app = express();          // Създаваме променлива app, която ще стартира приложение на определен порт

    expressConfig(app);             // Вкарваме настройките на Express като подаваме app
    await databaseConfig(app);      // Вкарваме настройките на Database като подаваме app, тази функция е асинхронна и трябва да има await
    routesConfig(app);              // Вкарваме настройките на Routes като подаваме app

    app.listen(3000, () => console.log('Server is running on port 3000...'));  // Настройване приложението да слуша на порт 3000 и подаваме callback да ни изпише като е стартирано
}

start();                            // Изпълняваме функцията за стартиране 
