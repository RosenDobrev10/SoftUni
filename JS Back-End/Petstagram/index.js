const express = require('express'); 

const expressConfig = require('./config/express.js');
const databaseConfig = require('./config/database.js');
const routesConfig = require('./config/routes.js');

async function start() {            
	const app = express();          

    expressConfig(app);             
    await databaseConfig(app);      
    routesConfig(app);              

    app.listen(3000, () => console.log('Server is running on port 3000'));  
}

start();                            
