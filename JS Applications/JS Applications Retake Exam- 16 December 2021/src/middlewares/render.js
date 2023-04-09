import { render, html } from '../../node_modules/lit-html/lit-html.js';

// ${user ? html`` : html``}
const navTemplate = (user) => html`
	<nav>
		<a href="/">Theater</a>
		<ul>
			${user
				? html`<li><a href="/profile">Profile</a></li>
						<li><a href="/create">Create Event</a></li>
						<li><a href="/logout">Logout</a></li>`
				: html`<li><a href="/login">Login</a></li>
						<li><a href="/register">Register</a></li>`}
		</ul>
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
