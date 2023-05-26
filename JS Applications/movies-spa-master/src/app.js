// [x] improve HTML structure
// [x] create app.js module
// [x] create util.js containing hide and display of view
// [x] placeholders for all views

// implement views
// - create request logic
// - DOM manipulation logic
// [x] catalog
// [x] login
// [ ] register
// [ ] create
// [ ] details
// [ ] like
// [ ] edit
// [ ] delete

import { homePage } from './home.js';
import { loginPage } from './login.js';
import { registerPage } from './register.js';
import { createPage } from './create.js';
import { updateNav } from './util.js';


const routes = {
    '/': homePage,
    '/login': loginPage,
    '/logout': logout,
    '/register': registerPage,
    '/create': createPage,
};

document.querySelector('nav').addEventListener('click', onNavigate);
document.querySelector('#add-movie-button a').addEventListener('click', onNavigate);

function onNavigate(event) {
    if (event.target.tagName == 'A' && event.target.href) {
        event.preventDefault();
        
        const url = new URL(event.target.href);
        const view = routes[url.pathname];

        if (typeof view == 'function') {
            view();
        }
    }
}

function logout() {
    localStorage.removeItem('user');
    updateNav();
}

// Start application in catalog view
updateNav();
homePage();