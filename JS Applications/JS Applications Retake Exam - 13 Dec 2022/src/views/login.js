import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as userService from '../api/user.js';

// Add @submit=${onSubmit} to form element
const loginTemplate = (onSubmit) => html`
	<section id="login">
		<div class="form">
			<h2>Login</h2>
			<form @submit=${onSubmit} class="login-form">
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
	// Maybe some validations are needed
	if (data.email === '' || data.password === '') {
		return alert('All fields are required!');
	}

	await userService.login(data.email, data.password);
	event.target.reset(); // Reset the form
	ctx.page.redirect('/catalog'); // Redirect to some page
}
