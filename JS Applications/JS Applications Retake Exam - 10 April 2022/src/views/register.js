import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as userService from '../api/user.js';

// Add @submit=${onSubmit} to form element
const registerTemplate = (onSubmit) => html`
	<section id="register-page" class="auth">
		<form id="register" @submit=${onSubmit}>
			<h1 class="title">Register</h1>

			<article class="input-group">
				<label for="register-email">Email: </label>
				<input type="email" id="register-email" name="email" />
			</article>

			<article class="input-group">
				<label for="register-password">Password: </label>
				<input type="password" id="register-password" name="password" />
			</article>

			<article class="input-group">
				<label for="repeat-password">Repeat Password: </label>
				<input
					type="password"
					id="repeat-password"
					name="repeatPassword"
				/>
			</article>

			<input type="submit" class="btn submit-btn" value="Register" />
		</form>
	</section>
`;

export async function registerPage(ctx) {
	ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
	if (data.email === '' || data.password === '' || data.repeatPassword === '') {
		// email or password may be different depend on the HTML
		return alert('All fields are required!');
	}

	// CHANGE NEXT LINE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	if (data.password !== data.repeatPassword) {
		// CHANGE [confirm-password] with the name in the template
		return alert('Passwords do not match!');
	}

	await userService.register(data.email, data.password);
	event.target.reset(); // Reset the form
	ctx.page.redirect('/'); // Redirect to some page
}
