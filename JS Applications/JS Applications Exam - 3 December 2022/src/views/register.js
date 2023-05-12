import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as userService from '../api/user.js';

// Add @submit=${onSubmit} to form element
const registerTemplate = (onSubmit) => html`<section id="register">
	<div class="form">
		<h2>Register</h2>
		<form @submit=${onSubmit} class="login-form">
			<input
				type="text"
				name="email"
				id="register-email"
				placeholder="email"
			/>
			<input
				type="password"
				name="password"
				id="register-password"
				placeholder="password"
			/>
			<input
				type="password"
				name="re-password"
				id="repeat-password"
				placeholder="repeat password"
			/>
			<button type="submit">register</button>
			<p class="message">
				Already registered? <a href="/login">Login</a>
			</p>
		</form>
	</div>
</section>`;

export async function registerPage(ctx) {
	ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
	if (data.email === '' || data.password === '') {
		// email or password may be different depend on the HTML
		return alert('All fields are required!');
	}

	// CHANGE NEXT LINE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	if (data.password !== data['re-password']) {
		// CHANGE [confirm-password] with the name in the template
		return alert('Passwords do not match!');
	}

	await userService.register(data.email, data.password);
	event.target.reset(); // Reset the form
	ctx.page.redirect('/catalog'); // Redirect to some page
}
