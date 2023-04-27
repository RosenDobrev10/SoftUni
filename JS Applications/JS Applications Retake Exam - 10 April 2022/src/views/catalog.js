import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

// ${item.} for every dynamic content
// /details/${item._id} to details href
const cardTemplate = (item) => html`
	<div class="post">
		<h2 class="post-title">${item.title}</h2>
		<img class="post-image" src=${item.imageUrl} alt="Material Image" />
		<div class="btn-wrapper">
			<a href="/details/${item._id}" class="details-btn btn">Details</a>
		</div>
	</div>
`; // Collection in singular form(Единствено число)

// ${items.length > 0 ? items.map(cardTemplate) : html``}
const catalogTemplate = (items) => html`
	<section id="dashboard-page">
		<h1 class="title">All Posts</h1>
		<div class="all-posts">
			${items.length > 0
				? items.map(cardTemplate)
				: html`<h1 class="title no-posts-title">No posts yet!</h1>`}
		</div>
	</section>
`; // Change variable name

export async function catalogPage(ctx) {
	const items = await service.getAll(); // Change variable name and function from service
	ctx.render(catalogTemplate(items)); // Change variable name
}
