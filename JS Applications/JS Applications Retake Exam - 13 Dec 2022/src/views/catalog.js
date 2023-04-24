import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

// ${item.} for every dynamic content
// /details/${item._id} to details href
const cardTemplate = (item) => html`
	<div class="product">
		<img src=${item.imageUrl} alt="example1" />
		<p class="title">${item.name}</p>
		<p><strong>Price:</strong><span class="price">${item.price}</span>$</p>
		<a class="details-btn" href="/details/${item._id}">Details</a>
	</div>
`; // Collection in singular form(Единствено число)

// ${items.length > 0 ? items.map(cardTemplate) : html``}
const catalogTemplate = (items) => html`
	<h2>Products</h2>
	<section id="dashboard">
		${items.length > 0
			? items.map(cardTemplate)
			: html`<h2>No products yet.</h2>`}
	</section>
`; // Change variable name

export async function catalogPage(ctx) {
	const items = await service.getAll(); // Change variable name and function from service
	ctx.render(catalogTemplate(items)); // Change variable name
}
