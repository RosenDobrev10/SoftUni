import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as userService from '../api/user.js';

const loginTemplate = (onSubmit) => html`
	<section id="login">
		<div class="form">
			<h2>Login</h2>
			<form class="login-form" @submit=${onSubmit}>
				<input
					type="text"
					name="email"
					id="email"
					placeholder="email"
				/>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="password"
				/>
				<button type="submit">login</button>
				<p class="message">
					Not registered? <a href="/register">Create an account</a>
				</p>
			</form>
		</div>
	</section>
`;

export async function loginPage(ctx) {
	ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
	if (data.email === '' || data.password === '') {
		return alert('All fields are required!');
	}

	await userService.login(data.email, data.password);
	event.target.reset();
	ctx.page.redirect('/');
}
