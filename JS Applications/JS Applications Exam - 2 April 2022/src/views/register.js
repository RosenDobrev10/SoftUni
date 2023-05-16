import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as userService from '../api/user.js';

const registerTemplate = (onSubmit) => html`<section id="registerPage">
	<form @submit=${onSubmit} class="registerForm">
		<img src="./images/logo.png" alt="logo" />
		<h2>Register</h2>
		<div class="on-dark">
			<label for="email">Email:</label>
			<input
				id="email"
				name="email"
				type="text"
				placeholder="steven@abv.bg"
				value=""
			/>
		</div>

		<div class="on-dark">
			<label for="password">Password:</label>
			<input
				id="password"
				name="password"
				type="password"
				placeholder="********"
				value=""
			/>
		</div>

		<div class="on-dark">
			<label for="repeatPassword">Repeat Password:</label>
			<input
				id="repeatPassword"
				name="repeatPassword"
				type="password"
				placeholder="********"
				value=""
			/>
		</div>

		<button class="btn" type="submit">Register</button>

		<p class="field">
			<span>If you have profile click <a href="/login">here</a></span>
		</p>
	</form>
</section>`; // Add @submit=${onSubmit} to form element

export async function registerPage(ctx) {
	ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
	if (data.email === '' || data.password === '') {
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
