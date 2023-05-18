import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

const cardTemplate = (fruit) => html`
	<div class="fruit">
		<img src=${fruit.imageUrl} alt="example1" />
		<h3 class="title">${fruit.name}</h3>
		<p class="description">${fruit.description}</p>
		<a class="details-btn" href="/details/${fruit._id}">More Info</a>
	</div>
`;

const catalogTemplate = (fruits) => html`
	<h2>Fruits</h2>
	<section id="dashboard">
		${fruits.length > 0
			? fruits.map(cardTemplate)
			: html`<h2>No fruit info yet.</h2>`}
	</section>
`;

export async function catalogPage(ctx) {
	const fruits = await service.getAll();
	ctx.render(catalogTemplate(fruits));
}
