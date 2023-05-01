import { html } from '../lib.js';
import { getUserData } from '../util.js';

const homeTemplate = () => html`<section id="welcome">
	<div id="welcome-container">
		<h1>Welcome To Meme Lounge</h1>
		<img src="/images/welcome-meme.jpg" alt="meme" />
		<h2>Login to see our memes right away!</h2>
		<div id="button-div">
			<a href="/login" class="button">Login</a>
			<a href="/register" class="button">Register</a>
		</div>
	</div>
</section>`;

export function homeView(ctx) {
	if (getUserData()) {
		ctx.page.redirect('/memes');
	} else {
		ctx.render(homeTemplate());
	}
}
