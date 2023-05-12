import { html } from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = () => html`<section id="home">
	<img src="./images/landing.png" alt="home" />

	<h2 id="landing-text">
		<span>Add your favourite albums</span> <strong>||</strong>
		<span>Discover new ones right here!</span>
	</h2>
</section>`;

export async function homePage(ctx) {
	ctx.render(homeTemplate());
}
