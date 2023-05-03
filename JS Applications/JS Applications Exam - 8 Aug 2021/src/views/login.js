import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as userService from '../api/user.js';

const loginTemplate = (onSubmit) => html`<section id="login-page" class="login">
	<form @submit=${onSubmit} id="login-form" action="" method="">
		<fieldset>
			<legend>Login Form</legend>
			<p class="field">
				<label for="email">Email</label>
				<span class="input">
					<input
						type="text"
						name="email"
						id="email"
						placeholder="Email"
					/>
				</span>
			</p>
			<p class="field">
				<label for="password">Password</label>
				<span class="input">
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
					/>
				</span>
			</p>
			<input class="button submit" type="submit" value="Login" />
		</fieldset>
	</form>
</section> `; // Add @submit=${onSubmit} to form element

export async function loginPage(ctx) {
	ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
	if (data.email === '' || data.password === '') {
		return alert('All fields are required!');
	}
	// Maybe some validations are needed

	await userService.login(data.email, data.password);
	event.target.reset(); // Reset the form
	ctx.page.redirect('/'); // Redirect to some page
}
