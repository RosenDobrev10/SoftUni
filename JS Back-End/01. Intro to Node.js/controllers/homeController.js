const { html } = require('../util.js');

function homePage(req, res) {
	res.write(html(`
    <h1>Home Page</h1>
    <p>Welcome to our site</p>`, 'Home',),);
	res.end();
}

function aboutPage(req, res) {
	res.write(html(`
    <h1>About Page</h1>
    <p>Contact: 08977343743</p>`, 'About',),);
	res.end();
}

function defaultPage(req, res) {
    res.statusCode = 404;
	res.write(html(`
    <h1>404 Not Found</h1>
    <p>The resource can not be found!</p>`, '404'));
	res.end();
}

module.exports = {
    homePage,
    aboutPage,
    defaultPage,
}