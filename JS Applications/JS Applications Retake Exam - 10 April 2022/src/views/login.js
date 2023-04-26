import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as userService from '../api/user.js';

// Add @submit=${onSubmit} to form element
const loginTemplate = (onSubmit) => html`
	<section id="login-page" class="auth">
		<form id="login" @submit=${onSubmit}>
			<h1 class="title">Login</h1>

			<article class="input-group">
				<label for="login-email">Email: </label>
				<input type="email" id="login-email" name="email" />
			</article>

			<article class="input-group">
				<label for="password">Password: </label>
				<input type="password" id="password" name="password" />
			</article>

			<input type="submit" class="btn submit-btn" value="Log In" />
		</form>
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
	ctx.page.redirect('/'); // Redirect to some page
}
