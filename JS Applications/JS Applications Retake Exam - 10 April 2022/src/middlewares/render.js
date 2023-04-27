import { render, html } from '../../node_modules/lit-html/lit-html.js';

// ${user ? html`` : html``}
const navTemplate = (user) => html`
	<h1><a href="/">Orphelp</a></h1>

	<nav>
		<a href="/">Dashboard</a>
		${user
			? html`<div id="user">
					<a href="/profile">My Posts</a>
					<a href="/create">Create Post</a>
					<a href="/logout">Logout</a>
			  </div>`
			: html`<div id="guest">
					<a href="/login">Login</a>
					<a href="/register">Register</a>
			  </div>`}
	</nav>
`;

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
