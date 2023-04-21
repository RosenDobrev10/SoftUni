import { html } from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = () => html`<section id="home">
	<h1>Welcome to Sole Mates</h1>
	<img src="./images/home.jpg" alt="home" />
	<h2>Browse through the shoe collectibles of our users</h2>
	<h3>Add or manage your items</h3>
</section>`;

export async function homePage(ctx) {
	ctx.render(homeTemplate());
}
