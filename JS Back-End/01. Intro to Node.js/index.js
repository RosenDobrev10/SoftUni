const http = require('http');
const router = require('./router.js')
const { catalogPage, createPage, createItem } = require('./controllers/catalogController.js');
const { homePage, aboutPage, defaultPage, } = require('./controllers/homeController.js');


router.get('/', homePage);
router.get('/catalog', catalogPage);
router.get('/create', createPage);
router.post('/create', createItem);
router.get('/about', aboutPage);
router.get('default', defaultPage);


const server = http.createServer(router.match);

server.listen(3000);
