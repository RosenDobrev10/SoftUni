import { render, html } from '../../node_modules/lit-html/lit-html.js';

const navTemplate = (user) => html`<nav class="navbar">
	<section class="navbar-dashboard">
		<a href="/">Dashboard</a>
		${user
			? html`<div id="user">
					<span>Welcome, ${user.email}</span>
					<a class="button" href="/profile">My Books</a>
					<a class="button" href="/create">Add Book</a>
					<a class="button" href="/logout">Logout</a>
			  </div>`
			: html`<div id="guest">
					<a class="button" href="/login">Login</a>
					<a class="button" href="/register">Register</a>
			  </div>`}
	</section>
</nav>`;

const header = document.querySelector('header'); /// Selector may be different
const root = document.querySelector('main'); /// Selector may be different

function ctxRender(content) {
	render(content, root);
}

export function addRender(ctx, next) {
	render(navTemplate(ctx.user), header);
	ctx.render = ctxRender;
	next();
}
