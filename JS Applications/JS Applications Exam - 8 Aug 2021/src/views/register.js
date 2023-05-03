import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as userService from '../api/user.js';

const registerTemplate = (onSubmit) => html`<section
	id="register-page"
	class="register"
>
	<form @submit=${onSubmit} id="register-form" action="" method="">
		<fieldset>
			<legend>Register Form</legend>
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
			<p class="field">
				<label for="repeat-pass">Repeat Password</label>
				<span class="input">
					<input
						type="password"
						name="confirm-pass"
						id="repeat-pass"
						placeholder="Repeat Password"
					/>
				</span>
			</p>
			<input class="button submit" type="submit" value="Register" />
		</fieldset>
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
	if (data.password !== data['confirm-pass']) {
		// CHANGE [confirm-password] with the name in the template
		return alert('Passwords do not match!');
	}

	await userService.register(data.email, data.password);
	event.target.reset(); // Reset the form
	ctx.page.redirect('/'); // Redirect to some page
}
