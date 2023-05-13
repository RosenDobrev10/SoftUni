import { render, html } from '../../node_modules/lit-html/lit-html.js';

// ${user ? html`` : html``}
const navTemplate = (user) => html`
	<a id="logo" href="/"
		><img id="logo-img" src="./images/logo.png" alt=""
	/></a>

	<nav>
		<div>
			<a href="/catalog">Dashboard</a>
		</div>
		${user
			? html`<div class="user">
					<a href="/create">Add Album</a>
					<a href="/logout">Logout</a>
			  </div>`
			: html`<div class="guest">
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
