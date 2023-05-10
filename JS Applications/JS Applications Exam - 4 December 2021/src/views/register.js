import { register } from '../api/users.js';
import { html } from '../lib.js';

const registerTemplate = (onSubmit) => html`<section id="registerPage">
	<form @submit=${onSubmit}>
		<fieldset>
			<legend>Register</legend>

			<label for="email" class="vhide">Email</label>
			<input
				id="email"
				class="email"
				name="email"
				type="text"
				placeholder="Email"
			/>

			<label for="password" class="vhide">Password</label>
			<input
				id="password"
				class="password"
				name="password"
				type="password"
				placeholder="Password"
			/>

			<label for="conf-pass" class="vhide">Confirm Password:</label>
			<input
				id="conf-pass"
				class="conf-pass"
				name="conf-pass"
				type="password"
				placeholder="Confirm Password"
			/>

			<button type="submit" class="register">Register</button>

			<p class="field">
				<span
					>If you already have profile click
					<a href="/login">here</a></span
				>
			</p>
		</fieldset>
	</form>
</section>`;

export function registerView(ctx) {
	ctx.render(registerTemplate(onSubmit));

	async function onSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		const email = formData.get('email').trim();
		const password = formData.get('password').trim();
		const repeatPass = formData.get('conf-pass').trim();

		if (email === '' || password === '') {
			return alert('All fields are required!');
		}

		if (password !== repeatPass) {
			return alert('Passwords do not match!');
		}

		await register(email, password);
		event.target.reset();
		ctx.updateNav();
		ctx.page.redirect('/');
	}
}
