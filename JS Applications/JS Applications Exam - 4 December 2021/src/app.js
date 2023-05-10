import { page, render } from './lib.js';

import { getUserData } from './util.js';
import { logout } from './api/users.js';

import { homeView } from './views/home.js';
import { catalogView } from './views/catalog.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { createView } from './views/create.js';
import { searchView } from './views/search.js';

const main = document.querySelector('main');
document.querySelector('#logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homeView);
page('/catalog', catalogView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/search', searchView);

updateNav();
page.start();

function decorateContext(ctx, next) {
	ctx.render = renderMain;
	ctx.updateNav = updateNav;
	next();
}

function renderMain(templateResult) {
	render(templateResult, main);
}

function updateNav() {
	const userData = getUserData();
	if (userData) {
		document.querySelector('.user').style.display = 'inline-block';
		document.querySelector('.guest').style.display = 'none';
	} else {
		document.querySelector('.user').style.display = 'none';
		document.querySelector('.guest').style.display = 'inline-block';
	}
}

function onLogout() {
	logout();
	updateNav();
	page.redirect('/');
}
