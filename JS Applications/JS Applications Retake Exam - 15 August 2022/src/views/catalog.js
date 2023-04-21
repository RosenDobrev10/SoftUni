import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

// ${shoe.} for every dynamic content
// /details/${shoe._id} to details href
const cardTemplate = (shoe) => html`<li class="card">
	<img src=${shoe.imageUrl} alt="travis" />
	<p><strong>Brand: </strong><span class="brand">${shoe.brand}</span></p>
	<p><strong>Model: </strong><span class="model">${shoe.model}</span></p>
	<p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
	<a class="details-btn" href="/details/${shoe._id}">Details</a>
</li>`; // Collection in singular form(Единствено число)

// ${albums.length > 0 ? albums.map(cardTemplate) : html``}
const catalogTemplate = (shoes) => html`<section id="dashboard">
	<h2>Collectibles</h2>
	<ul class="card-wrapper">
		${shoes.length > 0
			? shoes.map(cardTemplate)
			: html`<h2>There are no items added yet.</h2>`}
	</ul>
</section>`; // Change variable name

export async function catalogPage(ctx) {
	const shoes = await service.getAll(); // Change variable name and function from service
	ctx.render(catalogTemplate(shoes)); // Change variable name
}
