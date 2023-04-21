import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

const cardTemplate = (shoe, isLogged) => html`<li class="card">
	<img src=${shoe.imageUrl} alt="travis" />
	<p><strong>Brand: </strong><span class="brand">${shoe.brand}</span></p>
	<p><strong>Model: </strong><span class="model">${shoe.model}</span></p>
	<p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
	${isLogged
		? html`<a class="details-btn" href="/details/${shoe._id}">Details</a>`
		: nothing}
</li>`;

const searchTemplate = (shoes, onSubmit, isLogged) => html`<section id="search">
	<h2>Search by Brand</h2>

	<form @submit=${onSubmit} class="search-wrapper cf">
		<input
			id="#search-input"
			type="text"
			name="search"
			placeholder="Search here..."
			required
		/>
		<button type="submit">Search</button>
	</form>

	<h3>Results:</h3>
	${shoes.length > 0
		? html`<div id="search-container">
				<ul class="card-wrapper">
					${shoes.map((x) => cardTemplate(x, isLogged))}
				</ul>
		  </div>`
		: html`<h2>There are no results found.</h2>`}
</section>`;

export async function searchPage(ctx) {
	const isLogged = ctx.user;
	let shoes = [];
	ctx.render(searchTemplate(shoes, onSubmit, isLogged));

	async function onSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const query = formData.get('search');
		// Maybe some validations are needed
		if (query === '') {
			return alert('Field is required!');
		}

		shoes = await service.search(query);
		event.target.reset(); // Reset the form
		ctx.render(searchTemplate(shoes, onSubmit, isLogged));
	}
}
